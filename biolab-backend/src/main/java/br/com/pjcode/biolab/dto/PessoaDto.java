package br.com.pjcode.biolab.dto;

import java.time.LocalDate;

import org.hibernate.validator.constraints.br.CPF;

import br.com.pjcode.biolab.domain.Pessoa;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class PessoaDto {

	private Long id;	
	
	private String nome;
	
	@CPF
	private String cpf;
	
	private String rg;
	
	private LocalDate dataNascimento;
	
	private String telefone;
	
	private String diabetico;		
	
	private String medicamentosQueToma;
	
	private String outrasInformacoes;
	
	public static Pessoa toPessoa(PessoaDto dto) {
		return new Pessoa(
				dto.getId(), 
				dto.getNome(), 
				dto.getCpf(), 
				dto.getRg(), 
				dto.getDataNascimento(), 
				dto.getTelefone(), 
				dto.getDiabetico(), 
				dto.getMedicamentosQueToma(), 
				dto.getOutrasInformacoes());
	}
	
	public static PessoaDto fromPessoa(Pessoa entity) {
		return new PessoaDto(entity.getId(), 
				entity.getNome(), 
				entity.getCpf(), 
				entity.getRg(), 
				entity.getDataNascimento(), 
				entity.getTelefone(), 
				entity.getDiabetico(), 
				entity.getMedicamentosQueToma(), 
				entity.getOutrasInformacoes());
	}

}
