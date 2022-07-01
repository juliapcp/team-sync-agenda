const { Router } = require('express');
const PostsController = require('../controllers/posts-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const postsController = new PostsController();

routes.get('/', postsController.listar);

routes.post('/', isAuth, upload.single('meuarquivo'), postsController.cadastrar);

module.exports = routes;