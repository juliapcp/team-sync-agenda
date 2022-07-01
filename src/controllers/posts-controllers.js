const bcrypt = require('bcrypt');
const { Post } = require('../models/Post');


class PostsController {

    async cadastrar(req, res) {
        console.log('PostsController/cadastrar', req.body);

        const post = await Post.create({
            userId: req.session.user.id,
            titulo: req.body.titulo,
            texto: req.body.texto,
            imagem: req.file.filename
        });


        res.redirect('/posts');
    }

    async listar(req, res) {    
        console.log('PostsController/listar');

        const posts = await Post.findAll();
        return res.send(JSON.stringify(posts));
    }

}

module.exports = PostsController;
