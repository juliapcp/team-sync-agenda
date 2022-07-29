
class CalendarioController {

    async listar(req, res) {
        return res.render('calendario/index');
    }

}

module.exports = CalendarioController;
