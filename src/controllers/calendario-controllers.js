
const { Usuario } = require('../models/Usuario');
const { Reuniao } = require('../models/Reuniao');

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

}

module.exports = CalendarioController;
