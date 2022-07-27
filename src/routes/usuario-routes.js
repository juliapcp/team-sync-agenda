const { Router } = require('express');
const UsuariosController = require('../controllers/usuarios-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { Usuario } = require('../models/Usuario');

const routes = Router();

const usuariosController = new UsuariosController();

routes.get('/profile', isAuth, usuariosController.detalhar);

routes.get('/listagem', async (req, res) => {
    const lista = await Usuario.findAll();
    return res.send(JSON.stringify(lista));
});

routes.post('/cadastrar', usuariosController.cadastrar);

routes.post('/login', usuariosController.login);

module.exports = routes;