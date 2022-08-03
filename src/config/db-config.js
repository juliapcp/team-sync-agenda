const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://biqfxyxiphpzxm:9d29adc6e4386602ebd28e4b25575d8e13714a2a1db74a3c063c51818d88ae81@ec2-34-203-182-65.compute-1.amazonaws.com:5432/d7bqm0ekral86e', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } })

module.exports = { sequelizeCon };