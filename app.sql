DROP DATABASE IF EXISTS app;

CREATE DATABASE app;
USE app;

DELIMITER #
CREATE PROCEDURE sp_consultaatendimentos()
BEGIN
	-- SELECT id, nome, bairro, DATE_FORMAT(visita, '%d/%m/%Y %H:%i') visita, tipo FROM mkradius.sis_solic
    -- WHERE status = 'pendente'
    -- UNION ALL
    -- SELECT chamado, mkradius.sis_cliente.nome, bairro, DATE_FORMAT(visita, '%d/%m/%Y %H:%i') visita, assunto FROM mkradius.sis_suporte
    -- inner join mkradius.sis_cliente on mkradius.sis_cliente.login = mkradius.sis_suporte.login
    -- WHERE STATUS = 'aberto' and (assunto = 'Conexao' or assunto = 'Cancelamento')
    -- Order by DATE_FORMAT(visita, '%H:%i') asc;
    SELECT mkradius.sis_suporte.id, mkradius.sis_suporte.assunto , mkradius.sis_suporte.nome, mkradius.sis_cliente.bairro, DATE_FORMAT(mkradius.sis_suporte.visita, '%d/%m/%Y %H:%i') 'visita'
	, mkradius.sis_func.nome 'tec' FROM mkradius.sis_suporte
	INNER JOIN mkradius.sis_cliente ON mkradius.sis_cliente.login = mkradius.sis_suporte.login
	INNER JOIN mkradius.sis_func ON mkradius.sis_suporte.tecnico = mkradius.sis_func.id 
	WHERE mkradius.sis_suporte.status = 'aberto' AND mkradius.sis_func.nome = 'JHOSEFE';
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
	mkradius.sis_func.nome 'tec', mkradius.sis_msg.msg
    FROM mkradius.sis_suporte
	INNER JOIN mkradius.sis_cliente ON mkradius.sis_cliente.login = mkradius.sis_suporte.login
	INNER JOIN mkradius.sis_func ON mkradius.sis_suporte.tecnico = mkradius.sis_func.id
    INNER JOIN mkradius.sis_msg ON mkradius.sis_msg.chamado = mkradius.sis_suporte.chamado
    WHERE mkradius.sis_suporte.id = p_id;
END#
DELIMITER ;
CALL sp_consultaatendimento(745);