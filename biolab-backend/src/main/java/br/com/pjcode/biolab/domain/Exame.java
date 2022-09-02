package br.com.pjcode.biolab.domain;

import java.math.BigDecimal;

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
@Table(name = "exame")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Exame {

	@Id
	@SequenceGenerator(name="exame_id_seq", sequenceName="exame_id_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "exame_id_seq")
	@Column(name = "id_exame")
	private Long id;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "tipo")
	private String tipo;
	
	@Column(name = "valor")
	private BigDecimal valor;
	
}
