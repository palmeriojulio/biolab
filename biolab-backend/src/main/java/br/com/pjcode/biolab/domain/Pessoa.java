package br.com.pjcode.biolab.domain;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pessoa")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Pessoa implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name="pessoa_id_seq", sequenceName="pessoa_id_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pessoa_id_seq")
	@Column(name = "id_pessoa")
	private Long id;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "cpf")
	private String cpf;
	
	@Column(name = "rg")
	private String rg;
	
	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;
	
	@Column(name = "telefone")
	private String telefone;
	
	@Column(name = "diabetico")
	private String diabetico;		
	
	@Column(name = "medicamentos_que_toma")
	private String medicamentosQueToma;
	
	@Column(name = "outras_informacoes")
	private String outrasInformacoes;
	
}
