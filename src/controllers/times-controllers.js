const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');
const { Usuario } = require('../models/Usuario');
const { UsuarioTime } = require('../models/UsuarioTime');


class TimesController {

    async cadastrar(req, res) {
        const time = await Time.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            usuarioId: req.session.usuario.id
        });
    
        if(req.body.membros){
            for(let membro of req.body.membros){
                const usuarioTime = await UsuarioTime.create({
                    timeId: time.id,
                    usuarioId: membro
                });
            }
        }

        res.redirect('/times');
    }

    async listar(req, res) {    
        const times = await Time.findAll(
            {
                include: [
                    {
                        model: UsuarioTime,
                        where: {
                            usuarioId: req.session.usuario.id
                        },
                        required: true
                    }
                ]
            }
        );
        return res.render('time/listagem', {times});
    }

    async mostraCadastro(req, res) {
        const usuarios = (await Usuario.findAll()).filter(function (usuario) {
            return usuario.id !== req.session.usuario.id;
        });
        return res.render('time/cadastro', {usuarios});
    }
}

module.exports = TimesController;
