const express = require('express');
const app  = express();

const setup = require('./models/orm-setup');

const session = require('express-session');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, // NAO SOBRESCREVER CASO NAO HAJA MODIFICAÇÕES,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true,
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));

const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

const postsRoutes = require('./routes/post-routes');
app.use('/posts', postsRoutes);

app.listen(3000, () => {
    console.log('Listening at 3000');
})