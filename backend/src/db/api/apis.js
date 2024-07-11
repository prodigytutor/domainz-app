const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ApisDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const apis = await db.apis.create(
      {
        id: data.id || undefined,

        url: data.url || null,
        host: data.host || null,
        api_credentials: data.api_credentials || null,
        monitoring_info: data.monitoring_info || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await apis.setDomain(data.domain || null, {
      transaction,
    });

    await apis.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return apis;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const apisData = data.map((item, index) => ({
      id: item.id || undefined,

      url: item.url || null,
      host: item.host || null,
      api_credentials: item.api_credentials || null,
      monitoring_info: item.monitoring_info || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const apis = await db.apis.bulkCreate(apisData, { transaction });

    // For each item created, replace relation files

    return apis;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const apis = await db.apis.findByPk(id, {}, { transaction });

    await apis.update(
      {
        url: data.url || null,
        host: data.host || null,
        api_credentials: data.api_credentials || null,
        monitoring_info: data.monitoring_info || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await apis.setDomain(data.domain || null, {
      transaction,
    });

    await apis.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return apis;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const apis = await db.apis.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of apis) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of apis) {
        await record.destroy({ transaction });
      }
    });

    return apis;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const apis = await db.apis.findByPk(id, options);

    await apis.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await apis.destroy({
      transaction,
    });

    return apis;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const apis = await db.apis.findOne({ where }, { transaction });

    if (!apis) {
      return apis;
    }

    const output = apis.get({ plain: true });

    output.domain = await apis.getDomain({
      transaction,
    });

    output.asset_farm = await apis.getAsset_farm({
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
          [Op.and]: Utils.ilike('apis', 'url', filter.url),
        };
      }

      if (filter.host) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('apis', 'host', filter.host),
        };
      }

      if (filter.api_credentials) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'apis',
            'api_credentials',
            filter.api_credentials,
          ),
        };
      }

      if (filter.monitoring_info) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'apis',
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
          count: await db.apis.count({
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
      : await db.apis.findAndCountAll({
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
          Utils.ilike('apis', 'url', query),
        ],
      };
    }

    const records = await db.apis.findAll({
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
