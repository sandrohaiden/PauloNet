module.exports = (connection) => {
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function step1(req, res, next) {
        try {
            await consulta.execQuery('call sp_liberarcliente(?)', [req.params.id]);
            res.send({msg: 'Cliente liberado com sucesso!'});
        } catch (error) {
            if (error.message.indexOf('ERR_DUP_ENTRY'))
                res.send({ msg: 'O cliente já estava liberado!' });
            else
                res.status(214).send({ msg: 'Erro ao liberar cliente :(' });
        }
    }

    async function step2(req, res, next) {
        try {
            await consulta.execQuery('call sp_finalizarinstalacao(?, ?)', [req.params.id, req.body.tx]);
            res.send({msg: 'Instalação Finalizada!'});
        } catch (error) {
            res.status(214).send({msg: 'Erro ao finalizar instalação :('});
        }
    }

    return { step1: step1, step2: step2 };
}