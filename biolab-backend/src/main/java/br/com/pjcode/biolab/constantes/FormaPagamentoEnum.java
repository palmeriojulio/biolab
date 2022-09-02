package br.com.pjcode.biolab.constantes;

import lombok.Getter;

public enum FormaPagamentoEnum {

	A_VISTA("Á vista"),
	CARTAO_CREDITO("Cartão de Crédito"),
	CARTAO_DEBITO("Cartão de Débito");
	
	@Getter
	private String forma;
	
	private FormaPagamentoEnum(String forma) {
		this.forma = forma;
	}
}
