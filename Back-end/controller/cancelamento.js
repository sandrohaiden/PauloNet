module.exports = (connection) => {
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function post(req, res, next) {
        try {
            let body = req.body;
            console.log(body);
            await consulta.execQuery('call sp_respondercancelamento(?, ?, ?, ?)',
            [body.id, body.chamado, body.tec, body.msg]);
            res.send({msg: 'Dados enviados com sucesso!'});
        } catch (error) {
            res.send({msg: 'Problema ao enviar dados :('});
        }
    }

    return { post: post };
}