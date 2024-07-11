const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DomainsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const domains = await db.domains.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        url: data.url || null,
        registrar: data.registrar || null,
        price: data.price || null,
        registration_date: data.registration_date || null,
        renewal_date: data.renewal_date || null,
        name_servers: data.name_servers || null,
        dns_records: data.dns_records || null,
        admin_credentials: data.admin_credentials || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await domains.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return domains;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const domainsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      url: item.url || null,
      registrar: item.registrar || null,
      price: item.price || null,
      registration_date: item.registration_date || null,
      renewal_date: item.renewal_date || null,
      name_servers: item.name_servers || null,
      dns_records: item.dns_records || null,
      admin_credentials: item.admin_credentials || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const domains = await db.domains.bulkCreate(domainsData, { transaction });

    // For each item created, replace relation files

    return domains;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const domains = await db.domains.findByPk(id, {}, { transaction });

    await domains.update(
      {
        name: data.name || null,
        url: data.url || null,
        registrar: data.registrar || null,
        price: data.price || null,
        registration_date: data.registration_date || null,
        renewal_date: data.renewal_date || null,
        name_servers: data.name_servers || null,
        dns_records: data.dns_records || null,
        admin_credentials: data.admin_credentials || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await domains.setAsset_farm(data.asset_farm || null, {
      transaction,
    });

    return domains;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const domains = await db.domains.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of domains) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of domains) {
        await record.destroy({ transaction });
      }
    });

    return domains;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const domains = await db.domains.findByPk(id, options);

    await domains.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await domains.destroy({
      transaction,
    });

    return domains;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const domains = await db.domains.findOne({ where }, { transaction });

    if (!domains) {
      return domains;
    }

    const output = domains.get({ plain: true });

    output.apis_domain = await domains.getApis_domain({
      transaction,
    });

    output.hostings_domain = await domains.getHostings_domain({
      transaction,
    });

    output.websites_domain = await domains.getWebsites_domain({
      transaction,
    });

    output.subdomains_domain = await domains.getSubdomains_domain({
      transaction,
    });

    output.asset_farm = await domains.getAsset_farm({
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('domains', 'name', filter.name),
        };
      }

      if (filter.url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('domains', 'url', filter.url),
        };
      }

      if (filter.registrar) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('domains', 'registrar', filter.registrar),
        };
      }

      if (filter.name_servers) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('domains', 'name_servers', filter.name_servers),
        };
      }

      if (filter.dns_records) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('domains', 'dns_records', filter.dns_records),
        };
      }

      if (filter.admin_credentials) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'domains',
            'admin_credentials',
            filter.admin_credentials,
          ),
        };
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.registration_dateRange) {
        const [start, end] = filter.registration_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            registration_date: {
              ...where.registration_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            registration_date: {
              ...where.registration_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.renewal_dateRange) {
        const [start, end] = filter.renewal_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            renewal_date: {
              ...where.renewal_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            renewal_date: {
              ...where.renewal_date,
              [Op.lte]: end,
            },
          };
        }
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
          count: await db.domains.count({
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
      : await db.domains.findAndCountAll({
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
          Utils.ilike('domains', 'name', query),
        ],
      };
    }

    const records = await db.domains.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
