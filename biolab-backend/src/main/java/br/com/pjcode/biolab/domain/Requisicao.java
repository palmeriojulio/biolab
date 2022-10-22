package br.com.pjcode.biolab.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.com.pjcode.biolab.constantes.FormaPagamentoEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "requisicao")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Requisicao {

	@Id
	@SequenceGenerator(name="requisicao_id_seq", sequenceName="requisicao_id_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "requisicao_id_seq")
	@Column(name = "id_requisicao")
	private Long id;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_pessoa", referencedColumnName = "id_pessoa")
	private Pessoa pessoa;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "requisicao_exame",
			joinColumns = {@JoinColumn(name="id_requisicao")},
			inverseJoinColumns = {@JoinColumn(name="id_exame")})
	private List<Exame> exames;
	
	@Column(name = "forma_pagamento", length = 20)
	@Enumerated(EnumType.STRING)
	private FormaPagamentoEnum formaPagamento;
	
	@Column(name = "nome_medico", length = 80)
	private String nomeMedico;
	
	@Column(name = "crm_medico", length = 15)
	private String crmMedico;
	
	@Column(name = "valor_total_requisicao")
	private BigDecimal valorTotalRequisicao;
	
	@Column(name = "data_criacao_requisicao")
	private LocalDate dataCriacaoRequisicao;
}
