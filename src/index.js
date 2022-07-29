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

const usuarioRoutes = require('./routes/usuario-routes');
app.use('/usuarios', usuarioRoutes);

const timesRoutes = require('./routes/time-routes');
app.use('/times', timesRoutes);

const calendarioRoutes = require('./routes/calendario-routes');
app.use('/calendario', calendarioRoutes);

app.listen(3000, () => {
    console.log('Listening at 3000');
})