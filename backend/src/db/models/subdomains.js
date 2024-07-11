const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const subdomains = sequelize.define(
    'subdomains',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      url: {
        type: DataTypes.TEXT,
      },

      host: {
        type: DataTypes.TEXT,
      },

      site_credentials: {
        type: DataTypes.TEXT,
      },

      monitoring_info: {
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

  subdomains.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.subdomains.belongsTo(db.domains, {
      as: 'domain',
      foreignKey: {
        name: 'domainId',
      },
      constraints: false,
    });

    db.subdomains.belongsTo(db.asset_farms, {
      as: 'asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.subdomains.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.subdomains.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return subdomains;
};
