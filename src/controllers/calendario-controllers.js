
const { Usuario } = require('../models/Usuario');
const { Reuniao } = require('../models/Reuniao');
const { UsuarioTime } = require('../models/UsuarioTime');
const { Time } = require('../models/Time');

class CalendarioController {

    async listar(req, res) {
        if (req.params.data){
            if(req.params.idUsuario){
                const usuarios = await Usuario.findAll();
                const reunioes = await Reuniao.findAll({
                    where: {
                        "usuarioId": req.params.idUsuario
                    },
                    include: [
                        {
                            model: Time, as: 'time',
                            required: false
                        }
                    ]
                })
                return res.render('calendario/index', { data: req.params.data.concat('T00:00'), usuarios, idUsuario: req.params.idUsuario });
            } else {
                return res.redirect('/calendario/' + req.params.data +'/'+req.session.usuario.id);
            }
        } else {
            return res.redirect('/calendario/' + new Date().toISOString().slice(0, 10));
        }
    }

}

module.exports = CalendarioController;
