DROP DATABASE IF EXISTS app;

CREATE DATABASE app;
USE app;

DELIMITER #
CREATE PROCEDURE sp_consultaatendimentos()
BEGIN
	SELECT mkradius.sis_solic.id 'chamado', mkradius.sis_solic.id, mkradius.sis_solic.tipo 'assunto', mkradius.sis_solic.nome,
    mkradius.sis_solic.bairro, DATE_FORMAT(mkradius.sis_solic.visita, '%d/%m/%Y %H:%i') 'visita',
    mkradius.sis_solic.endereco, mkradius.sis_solic.numero,
    mkradius.sis_solic.plano, mkradius.sis_solic.complemento,
    mkradius.sis_solic.celular, mkradius.sis_solic.celular2,
    mkradius.sis_solic.login, mkradius.sis_solic.senha,
    mkradius.sis_solic.equipamento, mkradius.sis_solic.comodato,
    mkradius.sis_solic.telefone 'fone', mkradius.sis_solic.vendedor
    FROM mkradius.sis_solic
    WHERE mkradius.sis_solic.instalado = 'nao'
    
    UNION ALL

	SELECT mkradius.sis_suporte.chamado, mkradius.sis_suporte.id, mkradius.sis_suporte.assunto, mkradius.sis_suporte.nome,
    mkradius.sis_cliente.bairro, DATE_FORMAT(mkradius.sis_suporte.visita, '%d/%m/%Y %H:%i') 'visita',
    mkradius.sis_cliente.endereco, mkradius.sis_cliente.numero,
    mkradius.sis_cliente.plano, mkradius.sis_cliente.complemento,
    mkradius.sis_cliente.celular, mkradius.sis_cliente.celular2,
    mkradius.sis_cliente.login, mkradius.sis_cliente.senha,
    mkradius.sis_cliente.equipamento, mkradius.sis_cliente.comodato,
	mkradius.sis_cliente.fone, mkradius.sis_func.nome 'tec'
    FROM mkradius.sis_suporte
	INNER JOIN mkradius.sis_cliente ON mkradius.sis_cliente.login = mkradius.sis_suporte.login
	INNER JOIN mkradius.sis_func ON mkradius.sis_suporte.tecnico = mkradius.sis_func.id
	WHERE mkradius.sis_suporte.status = 'aberto' AND mkradius.sis_func.nome = 'JHOSEFE'
    AND DATE_FORMAT(mkradius.sis_suporte.visita, '%Y-%m-%d') LIKE curdate();
END#
DELIMITER ;
CALL sp_consultaatendimentos();

DELIMITER #
CREATE PROCEDURE sp_consultaatendimento(p_id int)
BEGIN
	SELECT mkradius.sis_suporte.chamado, mkradius.sis_suporte.assunto, mkradius.sis_suporte.nome,
    mkradius.sis_cliente.bairro, DATE_FORMAT(mkradius.sis_suporte.visita, '%d/%m/%Y %H:%i') 'visita',
    mkradius.sis_cliente.endereco, mkradius.sis_cliente.numero,
    mkradius.sis_cliente.plano, mkradius.sis_cliente.complemento,
    mkradius.sis_cliente.celular, mkradius.sis_cliente.celular2,
    mkradius.sis_cliente.login, mkradius.sis_cliente.senha,
    mkradius.sis_cliente.equipamento, mkradius.sis_cliente.comodato,
	mkradius.sis_cliente.fone, mkradius.sis_func.nome 'tec', mkradius.sis_msg.msg
    FROM mkradius.sis_suporte
	INNER JOIN mkradius.sis_cliente ON mkradius.sis_cliente.login = mkradius.sis_suporte.login
	INNER JOIN mkradius.sis_func ON mkradius.sis_suporte.tecnico = mkradius.sis_func.id
    INNER JOIN mkradius.sis_msg ON mkradius.sis_msg.chamado = mkradius.sis_suporte.chamado
    WHERE mkradius.sis_suporte.id = p_id;
END#
DELIMITER ;
CALL sp_consultaatendimento(745);

DELIMITER #
CREATE PROCEDURE sp_consultanotas(p_chamado varchar(255))
BEGIN
	SELECT mkradius.sis_msg.msg
    FROM mkradius.sis_msg
    WHERE mkradius.sis_msg.chamado = p_chamado;
END#
DELIMITER ;
CALL sp_consultanotas('27061501465782');

DELIMITER #
CREATE PROCEDURE sp_consultaobs(p_idinst varchar(255))
BEGIN
	SELECT mkradius.sis_solic.obs 'msg'
    FROM mkradius.sis_solic
    WHERE mkradius.sis_solic.id = p_idinst;
END#
DELIMITER ;
CALL sp_consultaobs('1');


DELIMITER #
CREATE PROCEDURE sp_fecharchamado(p_chamado varchar(255), p_texto varchar(1000))
BEGIN
	UPDATE mkradius.sis_suporte SET status = 'fechado', fechamento = now(),
    motivo_fechar = p_texto WHERE mkradius.sis_suporte.chamado = p_chamado;
END#
DELIMITER ;

DELIMITER #
CREATE PROCEDURE sp_finalizaristalacao(p_chamado varchar(255), p_texto varchar(1000))
BEGIN
	
    INSERT INTO mkradius.sis_cliente
    (mkradius.sis_cliente.nome, mkradius.sis_cliente.email, mkradius.sis_cliente.endereco,
    mkradius.sis_cliente.endereco, mkradius.sis_cliente.bairro, mkradius.sis_cliente.cidade,
    mkradius.sis_cliente.cep, mkradius.sis_cliente.estado, mkradius.sis_cliente.cpf_cnpj,
    mkradius.sis_cliente.fone, mkradius.sis_cliente.obs, mkradius.sis_cliente.nascimento,
    mkradius.sis_cliente.cadastro, mkradius.sis_cliente.login, mkradius.sis_cliente.senha,
    mkradius.sis_cliente.venc, mkradius.sis_cliente.plano, mkradius.sis_cliente.complemento,
    mkradius.sis_cliente.rg, mkradius.sis_cliente.celular, mkradius.sis_cliente.comodato,
    mkradius.sis_cliente.tecnico, mkradius.sis_cliente.numero, mkradius.sis_cliente.endereco_res,
    mkradius.sis_cliente.numero_res, mkradius.sis_cliente.bairro_res, mkradius.sis_cliente.cidade_res,
    mkradius.sis_cliente.cep_res, mkradius.sis_cliente.estado_res, mkradius.sis_cliente.complemento_res,
    mkradius.sis_cliente.contrato, mkradius.sis_cliente.opcelular, mkradius.sis_cliente.equipamento,
    mkradius.sis_cliente.termo, mkradius.sis_cliente.celular2, mkradius.sis_cliente.opcelular2,
    mkradius.sis_cliente.ramal, mkradius.sis_cliente.autoip, mkradius.sis_cliente.automac,
    mkradius.sis_cliente.conta, mkradius.sis_cliente.chavetipo, mkradius.sis_cliente.grupo,
    mkradius.sis_cliente.ssid, mkradius.sis_cliente.vendedor, mkradius.sis_cliente.grupo,
    mkradius.sis_cliente.mbdisco, mkradius.sis_cliente.rem_obs, mkradius.sis_cliente.dias_corte,
    mkradius.sis_cliente.geranfe, mkradius.sis_cliente.tipo_pessoa, mkradius.sis_cliente.data_desbloq,
    mkradius.sis_cliente.tipo_cliente, mkradius.sis_cliente.uuid_cliente, mkradius.sis_cliente.tipo_cob,
    mkradius.sis_cliente.tipo)
    SELECT 
    mkradius.sis_solic.nome, mkradius.sis_solic.email, mkradius.sis_solic.endereco,
    mkradius.sis_solic.endereco, mkradius.sis_solic.bairro, mkradius.sis_solic.cidade,
    mkradius.sis_solic.cep, mkradius.sis_solic.estado, mkradius.sis_solic.cpf,
    mkradius.sis_solic.telefone, mkradius.sis_solic.obs, mkradius.sis_solic.data_nasc,
    mkradius.sis_solic.data_inst, mkradius.sis_solic.login, mkradius.sis_solic.senha,
    mkradius.sis_solic.vencimento, mkradius.sis_solic.plano, mkradius.sis_solic.complemento,
    mkradius.sis_solic.rg, mkradius.sis_solic.celular, mkradius.sis_solic.comodato,
    mkradius.sis_solic.tecnico, mkradius.sis_solic.numero, mkradius.sis_solic.endereco_res,
    mkradius.sis_solic.numero_res, mkradius.sis_solic.bairro_res, mkradius.sis_solic.cidade_res,
    mkradius.sis_solic.cep_res, mkradius.sis_solic.estado_res, mkradius.sis_solic.complemento_res,
    mkradius.sis_solic.contrato, mkradius.sis_solic.opcelular, mkradius.sis_solic.equipamento,
    mkradius.sis_solic.termo, mkradius.sis_solic.celular2, mkradius.sis_solic.opcelular2,
    'todos'/*ramal*/, 'nao'/*autoip*/, 'nao'/*automac*/, '1'/*conta*/, 'nenhuma'/*chavetipo*/,
    'outros'/*ssid*/, 'nenhum'/*vendedor*/,'outros'/*grupo*/, 12/*mbdisco*/, now()/*rem_obs*/,
    5/*dias_corte*/, 'nao'/*geranfe*/, 3/*tipo_pessoa*/, now()/*data_desbloq*/, 3/*tipo_cliente*/,
    uuid()/*uuid_cliente*/, 'carne'/*carne*/, 'ppoe'/*tipo*/
    FROM mkradius.sis_solic;
END#
DELIMITER ;