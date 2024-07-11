const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const hostings = sequelize.define(
    'hostings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      provider: {
        type: DataTypes.TEXT,
      },

      account_credentials: {
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

  hostings.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.hostings.belongsTo(db.domains, {
      as: 'domain',
      foreignKey: {
        name: 'domainId',
      },
      constraints: false,
    });

    db.hostings.belongsTo(db.asset_farms, {
      as: 'asset_farm',
      foreignKey: {
        name: 'asset_farmId',
      },
      constraints: false,
    });

    db.hostings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.hostings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return hostings;
};
