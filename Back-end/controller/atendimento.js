module.exports = (connection)=>{
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function get(req, res, next){
        var result = await consulta.execQuery('call sp_consultaatendimentos()');
       /* var result = await consulta.execQuery(`select id, nome, DATE_FORMAT(visita, '%m/%d/%Y %H:%i') 'visita', assunto from sis_suporte
        union all
        select id, nome, DATE_FORMAT(visita, '%m/%d/%Y %H:%i') 'visita', "" from sis_solic`);
        //res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");*/
        res.send(result);
    }

    async function getChamadoById(req, res, next){
        var result = await consulta.execQuery('call sp_consultaatendimento(?)', [req.params.id]);
        res.send(result);
    }

    return {get: get, getChamadoById: getChamadoById};
}