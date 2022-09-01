/* Drop Tables */

DROP TABLE IF EXISTS pessoa CASCADE
;

/* Drop Sequences for Autonumber Columns */

DROP SEQUENCE IF EXISTS pessoa_id_seq
;

/* Create Sequences */

CREATE SEQUENCE pessoa_id_seq INCREMENT 1 START 1
;

/* Create Tables */

CREATE TABLE pessoa
(
	id integer NOT NULL DEFAULT NEXTVAL('pessoa_id_seq'),    -- Identificador da pessoa
	nome varchar(200),    -- Nome da pessoa
	cpf varchar(14),    -- CPF da pessoa
	rg varchar(20),		-- RG da pessoa
	dataNascimento DATE, 	-- Data de nascimento da pessoa
	telefone varchar(20),	-- Telefone da pessoa
	diabetico varchar(20),	-- Informa se a pessoa é diabética ou não
	medicamentos_que_toma varchar(255),	-- Medicamentos que a pessoa toma
	outras_informacoes varchar(255)		-- Outras informações
)
;


/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE pessoa ADD CONSTRAINT pk_pessoa
	PRIMARY KEY (id)
;

/* Create Foreign Key Constraints */
