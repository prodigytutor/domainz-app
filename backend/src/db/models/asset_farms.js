const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const asset_farms = sequelize.define(
    'asset_farms',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  asset_farms.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.asset_farms.hasMany(db.users, {
      as: 'users_asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.asset_farms.hasMany(db.apis, {
      as: 'apis_asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.asset_farms.hasMany(db.domains, {
      as: 'domains_asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.asset_farms.hasMany(db.hostings, {
      as: 'hostings_asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.asset_farms.hasMany(db.websites, {
      as: 'websites_asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.asset_farms.hasMany(db.subdomains, {
      as: 'subdomains_asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    //end loop

    db.asset_farms.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.asset_farms.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return asset_farms;
};
