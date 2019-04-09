module.exports = (connection) => {
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function get(req, res, next) {
        var result = await consulta.execQuery('call sp_consultaatendimentos(?)', [req.params.tec]);
        for (r of result) {
            if (r.assunto != 'instalacao') {
                r.msg = await consulta.execQuery('call sp_consultanotas(?)', [r.chamado]);
            }
            else {
                r.msg = await consulta.execQuery('call sp_consultaobs(?)', [r.chamado]);
            }
        }
        res.send(result);
    }

    async function getChamadoById(req, res, next) {
        var result = await consulta.execQuery('call sp_consultaatendimento(?)', [req.params.id]);
        res.send(result);
    }

    async function post(req, res, next) {
        await consulta.execQuery('call sp_fecharchamado(?,?)', [req.params.chamado, req.body.texto]);
        res.send("ok");
    }

    async function postInst(req, res, next) {
        await consulta.execQuery('call sp_liberarcliente(?)', [req.params.chamado]);
        res.send("ok");
    }

    async function postInst2(req, res, next) {
        await consulta.execQuery('call sp_finalizarinstalacao(?, ?)', [req.params.chamado, req.body.tx]);
        res.send("ok");
    }

    return { get: get, getChamadoById: getChamadoById, post: post, postInst: postInst, postInst2: postInst2};
}