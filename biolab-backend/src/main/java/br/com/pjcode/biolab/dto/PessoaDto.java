package br.com.pjcode.biolab.dto;

import java.time.LocalDate;

import br.com.pjcode.biolab.domain.Pessoa;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PessoaDto {

	private Long id;	
	
	private String nome;
	
	private String cpf;
	
	private String rg;
	
	private LocalDate dataNascimento;
	
	private String telefone;
	
	private String diabetico;		
	
	private String medicamentosQueToma;
	
	private String outrasInformacoes;
	
	public Pessoa toPessoa() {
		var pessoa = new Pessoa();
		
		pessoa.setId(this.id);
		pessoa.setNome(this.nome);
		pessoa.setCpf(this.cpf);
		pessoa.setRg(this.rg);
		pessoa.setDataNascimento(this.dataNascimento);
		pessoa.setTelefone(this.telefone);
		pessoa.setDiabetico(this.diabetico);
		pessoa.setMedicamentosQueToma(this.medicamentosQueToma);
		pessoa.setOutrasInformacoes(this.outrasInformacoes);
		
		return pessoa;
	}

}
