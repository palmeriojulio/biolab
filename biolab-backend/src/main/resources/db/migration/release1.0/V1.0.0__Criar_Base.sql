--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

CREATE SEQUENCE exame_id_seq INCREMENT 1 START 1;

CREATE SEQUENCE pessoa_id_seq INCREMENT 1 START 1;

CREATE SEQUENCE requisicao_id_seq INCREMENT 1 START 1;

CREATE TABLE public.exame (
    id_exame bigint NOT NULL DEFAULT NEXTVAL('pessoa_id_seq'),
    nome character varying(50),
    tipo character varying(50),
    valor numeric(19,2)
);


CREATE TABLE public.pessoa (
    id_pessoa bigint NOT NULL DEFAULT NEXTVAL('exame_id_seq'),
    cpf character varying(11),
    data_nascimento date,
    diabetico character varying(3),
    medicamentos_que_toma character varying(20),
    nome character varying(80),
    outras_informacoes character varying(50),
    rg character varying(20),
    telefone character varying(15)
);

CREATE TABLE public.requisicao (
    id_requisicao bigint NOT NULL DEFAULT NEXTVAL('requisicao_id_seq'),
    crm_medico character varying(15),
    data_criacao_requisicao date,
    forma_pagamento character varying(20),
    nome_medico character varying(80),
    valor_total_requisicao numeric(19,2),
    id_pessoa bigint
);

CREATE TABLE public.requisicao_exame (
    id_requisicao bigint NOT NULL,
    id_exame bigint NOT NULL
);


-- Create Primary Keys


ALTER TABLE ONLY public.exame
    ADD CONSTRAINT exame_pkey PRIMARY KEY (id_exame);


ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id_pessoa);


ALTER TABLE ONLY public.requisicao
    ADD CONSTRAINT requisicao_pkey PRIMARY KEY (id_requisicao);
	

/* Create Foreign Key Constraints */

ALTER TABLE requisicao ADD CONSTRAINT fk_id_pessoa 
  FOREIGN KEY (id_pessoa) REFERENCES pessoa (id_pessoa) ON DELETE No Action ON UPDATE No Action;
