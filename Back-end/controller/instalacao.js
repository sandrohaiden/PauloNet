module.exports = (connection) => {
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function step1(req, res, next) {
        try {
            await consulta.execQuery('call sp_liberarcliente(?)', [req.params.id]);
            res.send('Cliente liberado com sucesso!');
        } catch (error) {
            if (error.message.indexOf('ERR_DUP_ENTRY'))
                res.send({ msg: 'O cliente já estava liberada!' });
            else
                res.send({ msg: 'Erro ao liberar cliente :(' });
        }
    }

    async function step2(req, res, next) {
        await consulta.execQuery('call sp_finalizarinstalacao(?, ?)', [req.params.id, req.body.tx]);
        res.send("ok");
    }

    return { step1: step1, step2: step2 };
}