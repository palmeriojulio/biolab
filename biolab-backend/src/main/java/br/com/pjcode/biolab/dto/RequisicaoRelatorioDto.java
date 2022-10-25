package br.com.pjcode.biolab.dto;

import java.math.BigDecimal;
import java.util.List;

import br.com.pjcode.biolab.domain.Requisicao;
import br.com.pjcode.biolab.util.DateUtil;
import br.com.pjcode.biolab.util.MaskUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RequisicaoRelatorioDto {

	private Long idRequisicao;
	
	private String nomePessoa;
	
	private String cpfPessoa;
	
	private String rgPesssoa;
	
	private String dataNascimentoPessoa;
	
	private String telefonePessoa;
	
	private String diabeticoPessoa;
	
	private String medicamentosQueTomaPessoa;
	
	private String outrasInformacoesPessoa;
	
	private List<ExameDto> exames;
	
	private String formaPagamento;
	
	private String nomeMedico;
	
	private String crmMedico;
	
	private BigDecimal valorTotalRequisicao;
	
	private String dataCriacaoRequisicao;
	
	public static RequisicaoRelatorioDto fromRequisicao(Requisicao entity) {
		return new RequisicaoRelatorioDto(
				entity.getId(), 
				entity.getPessoa().getNome(), 
				MaskUtil.includeMask(entity.getPessoa().getCpf(),"###.###.###-##"), 
				entity.getPessoa().getRg(), 
				DateUtil.convertLocalDateToString(entity.getPessoa().getDataNascimento(), "dd/MM/yyyy"), 
				MaskUtil.includeMask(entity.getPessoa().getTelefone(), "(##) #####-####"), 
				entity.getPessoa().getDiabetico(), 
				entity.getPessoa().getMedicamentosQueToma(), 
				entity.getPessoa().getOutrasInformacoes(), 
				ExameDto.fromConvertList(entity.getExames()), 
				entity.getFormaPagamento().getForma(), 
				entity.getNomeMedico(), 
				entity.getCrmMedico(), 
				entity.getValorTotalRequisicao(), 
				DateUtil.convertLocalDateToString(entity.getDataCriacaoRequisicao(), "dd/MM/yyyy"));
	}
}
