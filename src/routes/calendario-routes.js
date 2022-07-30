const { Router } = require('express');
const { isAuth } = require('../middlewares/is-auth');
const calendariosController = require('../controllers/calendario-controllers');

const routes = Router();

const calendarioController = new calendariosController();

routes.get('/:data', isAuth, calendarioController.listar);

module.exports = routes;