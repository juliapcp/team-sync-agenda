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

app.get('/', (req, res) => {
    res.redirect('/times');
});

const usuarioRoutes = require('./routes/usuario-routes');
app.use('/usuarios', usuarioRoutes);

const timesRoutes = require('./routes/time-routes');
app.use('/times', timesRoutes);

const calendarioRoutes = require('./routes/calendario-routes');
app.use('/calendario', calendarioRoutes);

const conviteRoutes = require('./routes/convite-routes');
app.use('/convites', conviteRoutes);

app.use('*', (req, res) => {
    return res.status(404).render('notFound')
})

const port = process.env.PORT;
app.listen(port, () => console.log('Server iniciado na porta ' + port));