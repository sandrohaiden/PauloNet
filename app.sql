DROP DATABASE IF EXISTS app;

CREATE DATABASE app;
USE app;

DELIMITER #
CREATE PROCEDURE sp_consultaatendimentos()
BEGIN
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
    AND DATE_FORMAT(mkradius.sis_suporte.visita, '%Y-%m-%d') LIKE curdate()
    ORDER BY DATE_FORMAT(mkradius.sis_suporte.visita, '%H:%i') ASC;
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
CREATE PROCEDURE sp_fechamento(p_chamado varchar(255), p_texto varchar(1000))
BEGIN
	UPDATE mkradius.sis_suporte SET status = 'fechado', fechamento = now(),
    motivo_fechar = p_texto WHERE mkradius.sis_suporte.chamado = p_chamado;
END#
DELIMITER ;