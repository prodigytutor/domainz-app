const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class HostingsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const hostings = await db.hostings.create(
      {
        id: data.id || undefined,

        provider: data.provider || null,
        account_credentials: data.account_credentials || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await hostings.setDomain(data.domain || null, {
      transaction,
    });

    await hostings.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return hostings;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const hostingsData = data.map((item, index) => ({
      id: item.id || undefined,

      provider: item.provider || null,
      account_credentials: item.account_credentials || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const hostings = await db.hostings.bulkCreate(hostingsData, {
      transaction,
    });

    // For each item created, replace relation files

    return hostings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const hostings = await db.hostings.findByPk(id, {}, { transaction });

    await hostings.update(
      {
        provider: data.provider || null,
        account_credentials: data.account_credentials || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await hostings.setDomain(data.domain || null, {
      transaction,
    });

    await hostings.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return hostings;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const hostings = await db.hostings.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of hostings) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of hostings) {
        await record.destroy({ transaction });
      }
    });

    return hostings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const hostings = await db.hostings.findByPk(id, options);

    await hostings.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await hostings.destroy({
      transaction,
    });

    return hostings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const hostings = await db.hostings.findOne({ where }, { transaction });

    if (!hostings) {
      return hostings;
    }

    const output = hostings.get({ plain: true });

    output.domain = await hostings.getDomain({
      transaction,
    });

    output.asset_farm = await hostings.getAsset_farm({
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

      if (filter.provider) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('hostings', 'provider', filter.provider),
        };
      }

      if (filter.account_credentials) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'hostings',
            'account_credentials',
            filter.account_credentials,
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
          count: await db.hostings.count({
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
      : await db.hostings.findAndCountAll({
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
          Utils.ilike('hostings', 'provider', query),
        ],
      };
    }

    const records = await db.hostings.findAll({
      attributes: ['id', 'provider'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['provider', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.provider,
    }));
  }
};
