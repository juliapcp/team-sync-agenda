const { Router } = require('express');
const calendariosController = require('../controllers/calendario-controllers');

const routes = Router();

const calendarioController = new calendariosController();

routes.get('/index', calendarioController.listar);

module.exports = routes;