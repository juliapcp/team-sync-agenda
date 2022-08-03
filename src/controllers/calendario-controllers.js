
const { Usuario } = require('../models/Usuario');
const { Reuniao } = require('../models/Reuniao');
const { Time } = require('../models/Time');
const { UsuarioTime } = require('../models/UsuarioTime');

class CalendarioController {

    async listar(req, res) {
        if (req.params.data){
            if(req.params.idUsuario){
                const usuarios = await Usuario.findAll();
                const ReuniaoModel = new Reuniao();
                const reunioes = await ReuniaoModel.findByUsuario(req.params.idUsuario, req.params.data);
                return res.render('calendario/index', { data: req.params.data.concat('T00:00'), usuarios, idUsuario: req.params.idUsuario, reunioes });
            } else {
                return res.redirect('/calendario/' + req.params.data +'/'+req.session.usuario.id);
            }
        } else {
            return res.redirect('/calendario/' + new Date().toISOString().slice(0, 10));
        }
    }
    async mostraCadastro(req, res) {
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
        return res.render('calendario/cadastro', {times});
    }
    async cadastrar(req, res) {
        
        res.redirect('/calendario');
    }
}

module.exports = CalendarioController;
