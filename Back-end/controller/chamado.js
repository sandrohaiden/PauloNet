module.exports = (connection) => {
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function get(req, res, next) {
        var result = await consulta.execQuery('call sp_consultaatendimentos(?)', [req.query.name]);
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
        try {
            await consulta.execQuery('call sp_fecharchamado(?,?)', [req.params.id, req.body.texto]);
            res.send({msg:'Chamado Finalizado com Sucesso!'});
        }catch(error){
            res.status(214).send({msg: 'Algo Inesperado Ocorreu :('});
        }
    }

    return { get: get, getChamadoById: getChamadoById, post: post };
}