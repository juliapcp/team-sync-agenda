const bcrypt = require('bcrypt');
const { Time } = require('../models/Time');
const { Usuario } = require('../models/Usuario');


class UsuariosController {
    async detalhar(req, res) {
        
        const usuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            },
            include: [Time]
        })

        return res.send(`<pre>${JSON.stringify(usuario, null, 2)}</pre>`); 
    }


    async cadastrar(req, res) {
        console.log('UsuariosController/cadastrar', req.body);

        const usuarioBody = req.body;
        const senha = bcrypt.hashSync(usuarioBody.senha, 10); 
        
        const usuario = {
            nome: usuarioBody.nome,
            email: usuarioBody.email,
            senha      
        }

        await Usuario.create(usuario);
    
        res.redirect('/usuarios/listagem');
    }

    async login(req, res) {
        console.log('UsuariosController/login', req.body);

        // ACHAR COM O EMAIL CERTO
        const { email, senha } = req.body;
        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!usuarioEcontrado) return res.send('Usuario nao encontrado');

        // VERIFICAR A SENHA
        const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);
        
        if (confere) {
            req.session.usuario = usuarioEcontrado;
            return res.send('Usuario e senha confirmados, vc fez o login');
        } else {
            return res.send('Senha nao confere...');
        }
        
    }
}

module.exports = UsuariosController;
