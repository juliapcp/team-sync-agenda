const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Reuniao extends Model { }

Reuniao.init({
    datahora: DataTypes.DATE,
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'reuniao',
    createdAt: false,
    updatedAt: false,
    timestamps: true
}, true);

module.exports = { Reuniao };