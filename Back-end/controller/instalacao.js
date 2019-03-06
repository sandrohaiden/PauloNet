module.exports = (connection)=>{
    var consulta = require("./consulta");
    consulta.connection(connection);

    async function get(req, res, next){
        var result = await consulta.execQuery('SELECT * FROM sis_solic');
        //res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        res.send(result);
    }

    async function getById(req, res, next){
        var result = await consulta.execQuery('SELECT * FROM sis_solic WHERE id=?', [req.params.id]);
        res.send(result);
    }

    return {get: get, getById: getById};
}