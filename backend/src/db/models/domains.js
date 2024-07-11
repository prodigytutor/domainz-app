const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const domains = sequelize.define(
    'domains',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      url: {
        type: DataTypes.TEXT,
      },

      registrar: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      registration_date: {
        type: DataTypes.DATE,
      },

      renewal_date: {
        type: DataTypes.DATE,
      },

      name_servers: {
        type: DataTypes.TEXT,
      },

      dns_records: {
        type: DataTypes.TEXT,
      },

      admin_credentials: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  domains.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.domains.hasMany(db.apis, {
      as: 'apis_domain',
      foreignKey: {
        name: 'domainId',
      },
      constraints: false,
    });

    db.domains.hasMany(db.hostings, {
      as: 'hostings_domain',
      foreignKey: {
        name: 'domainId',
      },
      constraints: false,
    });

    db.domains.hasMany(db.websites, {
      as: 'websites_domain',
      foreignKey: {
        name: 'domainId',
      },
      constraints: false,
    });

    db.domains.hasMany(db.subdomains, {
      as: 'subdomains_domain',
      foreignKey: {
        name: 'domainId',
      },
      constraints: false,
    });

    //end loop

    db.domains.belongsTo(db.asset_farms, {
      as: 'asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.domains.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.domains.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return domains;
};
