const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SubdomainsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const subdomains = await db.subdomains.create(
      {
        id: data.id || undefined,

        url: data.url || null,
        host: data.host || null,
        site_credentials: data.site_credentials || null,
        monitoring_info: data.monitoring_info || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await subdomains.setDomain(data.domain || null, {
      transaction,
    });

    await subdomains.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return subdomains;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const subdomainsData = data.map((item, index) => ({
      id: item.id || undefined,

      url: item.url || null,
      host: item.host || null,
      site_credentials: item.site_credentials || null,
      monitoring_info: item.monitoring_info || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const subdomains = await db.subdomains.bulkCreate(subdomainsData, {
      transaction,
    });

    // For each item created, replace relation files

    return subdomains;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const subdomains = await db.subdomains.findByPk(id, {}, { transaction });

    await subdomains.update(
      {
        url: data.url || null,
        host: data.host || null,
        site_credentials: data.site_credentials || null,
        monitoring_info: data.monitoring_info || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await subdomains.setDomain(data.domain || null, {
      transaction,
    });

    await subdomains.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return subdomains;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const subdomains = await db.subdomains.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of subdomains) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of subdomains) {
        await record.destroy({ transaction });
      }
    });

    return subdomains;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const subdomains = await db.subdomains.findByPk(id, options);

    await subdomains.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await subdomains.destroy({
      transaction,
    });

    return subdomains;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const subdomains = await db.subdomains.findOne({ where }, { transaction });

    if (!subdomains) {
      return subdomains;
    }

    const output = subdomains.get({ plain: true });

    output.domain = await subdomains.getDomain({
      transaction,
    });

    output.asset_farm = await subdomains.getAsset_farm({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.domains,
        as: 'domain',
      },

      {
        model: db.asset_farms,
        as: 'asset_farm',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('subdomains', 'url', filter.url),
        };
      }

      if (filter.host) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('subdomains', 'host', filter.host),
        };
      }

      if (filter.site_credentials) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'subdomains',
            'site_credentials',
            filter.site_credentials,
          ),
        };
      }

      if (filter.monitoring_info) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'subdomains',
            'monitoring_info',
            filter.monitoring_info,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.domain) {
        var listItems = filter.domain.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          domainId: { [Op.or]: listItems },
        };
      }

      if (filter.asset_farm) {
        var listItems = filter.asset_farm.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          asset_farmId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.subdomains.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.subdomains.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('subdomains', 'url', query),
        ],
      };
    }

    const records = await db.subdomains.findAll({
      attributes: ['id', 'url'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['url', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.url,
    }));
  }
};
