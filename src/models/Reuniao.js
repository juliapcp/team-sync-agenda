const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Reuniao extends Model { 
    async findByUsuario(idUsuario, data) {
        const dataFinal = new Date(data + 'T00:00');
        dataFinal.setDate(dataFinal.getDate()+1);
        const [results] = await sequelizeCon.query(`
                select 
                    reuniaos.descricao as "descReuniao", times.descricao as "descTime", "horaReuniao" 
                from
                    reuniaos
                left join usuariotimes on
                    reuniaos."timeId" = usuariotimes."timeId"
                left join times on 
                	reuniaos."timeId" = times.id    
                where
                    usuariotimes."usuarioId" = ${ idUsuario } 
                    and reuniaos."dataReuniao" >= '${data}'
                    and reuniaos."dataReuniao" < '${dataFinal.toISOString().substring(0,10)}'`);
        return results;
    }
}

Reuniao.init({
    dataReuniao: DataTypes.DATE,
    horaReuniao: DataTypes.TIME,
    descricao: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'reuniao',
    createdAt: false,
    updatedAt: false
}, true);

module.exports = { Reuniao };