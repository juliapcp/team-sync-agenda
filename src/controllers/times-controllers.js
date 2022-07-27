const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');


class TimesController {

    async cadastrar(req, res) {
        console.log('TimesController/cadastrar', req.body);

        const times = await Time.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            idresponsavel: req.body.idresponsavel
        });


        res.redirect('/times');
    }

    async listar(req, res) {    
        console.log('TimesController/listar');

        const times = await Time.findAll();
        return res.send(JSON.stringify(times));
    }

}

module.exports = TimesController;
