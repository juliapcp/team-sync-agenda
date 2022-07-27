const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Convite extends Model { }

Convite.init({
    stativo: DataTypes.BOOLEAN,
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'convite',
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true
}, true);

module.exports = { Convite };