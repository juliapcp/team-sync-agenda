const { Router } = require('express');
const TimesController = require('../controllers/times-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const timesController = new TimesController();

routes.get('/', isAuth, timesController.listar);

routes.get('/cadastrar', isAuth, timesController.mostraCadastro);

routes.post('/cadastrar', isAuth, timesController.cadastrar);

routes.get('/adicionarMembro/:id', isAuth, timesController.mostraAdicionarMembro);

routes.post('/adicionarMembro/:id', isAuth, timesController.adicionarMembro);

routes.get('/:id', isAuth, timesController.mostraPerfil);


module.exports = routes;