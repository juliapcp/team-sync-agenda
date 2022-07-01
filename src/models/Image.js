const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:root@127.0.0.1:5432/team-sync-agenda', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

class Image extends Model {}
    
Image.init({
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING
}, { 
    sequelize, 
    schema: 'SEU SCHEMA',
    modelName: 'image'
});

sequelize.sync();

module.exports = { Image };
