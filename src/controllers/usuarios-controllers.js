const bcrypt = require('bcrypt');
const { restart } = require('nodemon');
const { Time } = require('../models/Time');
const { Usuario } = require('../models/Usuario');


class UsuariosController {
    async detalhar(req, res) {
        
        const usuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        })
        return res.render('usuario/perfil', { usuario });
    }
    async mostraLogin(req, res) {
        return res.render('usuario/login');
    }

    async logout(req, res) {
        req.session.usuario = null;
        return res.redirect('/usuarios/login');
    }


    async cadastrar(req, res) {
        console.log('UsuariosController/cadastrar', req.body);

        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!usuarioEcontrado){
            const usuarioBody = req.body;
            const senha = bcrypt.hashSync(usuarioBody.senha, 10); 
            
            let caminhoImagemPerfil = '';
            if(req.file){
                caminhoImagemPerfil = 'images/' + req.file.filename;
            } else {
                caminhoImagemPerfil = 'icons/user.png';
            }
            const usuario = {
                nome: usuarioBody.nome,
                email: usuarioBody.email,
                imagem: caminhoImagemPerfil,
                senha      
            }

            const userDb = await Usuario.create(usuario);
        
            req.session.usuario = userDb;
            res.redirect('/times');
        } else {
            const msg = {};
            msg.titulo = "E-mail em uso";
            msg.mensagem = "Já existe um usuário cadastrado com o email";
            return res.render('usuario/login', {msg});
        }
    }

    async login(req, res) {

        const { email, senha } = req.body;
        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!usuarioEcontrado) {
            const msg = {};
            msg.titulo = "Email ou senha incorretos";
            msg.mensagem = "Email ou senha incorretos";
            return res.render('usuario/login', { msg });
        } 

        const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);
        
        if (confere) {
            req.session.usuario = usuarioEcontrado;
            res.redirect('/times');
        } else {
            const msg = {};
            msg.titulo = "Email ou senha incorretos";
            msg.mensagem = "Email ou senha incorretos";
            return res.render('usuario/login', { msg });
        }
        
    }
}

module.exports = UsuariosController;
