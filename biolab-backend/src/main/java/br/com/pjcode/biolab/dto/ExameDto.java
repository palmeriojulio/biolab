package br.com.pjcode.biolab.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotBlank;

import br.com.pjcode.biolab.domain.Exame;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ExameDto {

	private Long id;
	@NotBlank(message = "Nome do exame não pode está vazio!")
	private String nome;
	@NotBlank(message = "Tipo de exame não pode está vazio!")
	private String tipo;
	
	private BigDecimal valor;
	
	public static Exame toExame(ExameDto dto) {
		return new Exame(
				dto.getId(), 
				dto.getNome(), 
				dto.getTipo(), 
				dto.getValor());
	}
	
	public static ExameDto fromExame(Exame entity) {
		return new ExameDto(
				entity.getId(), 
				entity.getNome(), 
				entity.getTipo(), 
				entity.getValor());
	}
	
	public static List<Exame> toConvertList(List<ExameDto> exames) {
		return exames.stream()
					.map((e -> ExameDto.toExame(e)))
					.collect(Collectors.toList());
	}

	public static List<ExameDto> fromConvertList(List<Exame> exames) {
		return exames.stream()
				.map((e -> ExameDto.fromExame(e)))
				.collect(Collectors.toList());
	}
}
