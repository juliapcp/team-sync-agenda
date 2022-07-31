
class CalendarioController {

    async listar(req, res) {
        if (req.params.data){
            return res.render('calendario/index', {data: req.params.data.concat('T00:00')});
        } else {
            return res.redirect('/times/' + new Date().toISOString().slice(0, 10));
        }
    }

}

module.exports = CalendarioController;
