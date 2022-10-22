package br.com.pjcode.biolab.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotBlank;

import br.com.pjcode.biolab.constantes.FormaPagamentoEnum;
import br.com.pjcode.biolab.domain.Requisicao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RequisicaoDto {

	private Long id;
	
	private PessoaDto pessoa;
	
	private List<ExameDto> exames;
	private FormaPagamentoEnum formaPagamento;
	@NotBlank(message = "Nome do médico não pode está vazio!")
	private String nomeMedico;
	
	private String crmMedico;
	
	private BigDecimal valorTotalRequisicao;
	
	private LocalDate dataCriacaoRequisicao;
	
	public static Requisicao toRequisicao(RequisicaoDto dto) {
		return new Requisicao(
				dto.getId(), 
				PessoaDto.toPessoa(dto.getPessoa()), 
				ExameDto.toConvertList(dto.getExames()), 
				dto.getFormaPagamento(), 
				dto.getNomeMedico(), 
				dto.getCrmMedico(), 
				dto.getValorTotalRequisicao(), 
				dto.getDataCriacaoRequisicao());
	}
	
	public static RequisicaoDto fromRequisicao(Requisicao entity) {
		return new RequisicaoDto(
				entity.getId(), 
				PessoaDto.fromPessoa(entity.getPessoa()), 
				ExameDto.fromConvertList(entity.getExames()), 
				entity.getFormaPagamento(), 
				entity.getNomeMedico(), 
				entity.getCrmMedico(), 
				entity.getValorTotalRequisicao(), 
				entity.getDataCriacaoRequisicao());
	}

	
}
