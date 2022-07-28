const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');


class TimesController {

    async cadastrar(req, res) {
        const times = await Time.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            idresponsavel: 2
        });


        res.redirect('/times');
    }

    async listar(req, res) {    
        const times = await Time.findAll();
        return res.render('time/listagem', {times});
    }

    async mostraCadastro(req, res) {
        return res.render('time/cadastro');
    }
}

module.exports = TimesController;
