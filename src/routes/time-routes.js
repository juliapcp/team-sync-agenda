const { Router } = require('express');
const TimesController = require('../controllers/times-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const timesController = new TimesController();

routes.get('/', isAuth, timesController.listar);

routes.get('/cadastrar', isAuth, timesController.mostraCadastro);

routes.post('/cadastrar', isAuth, timesController.cadastrar);

routes.post('/', isAuth, upload.single('meuarquivo'), timesController.cadastrar);

module.exports = routes;