package br.com.pjcode.biolab.dto;

import javax.validation.constraints.NotBlank;

import br.com.pjcode.biolab.domain.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UsuarioDto {
	
	private Long id;
	@NotBlank(message = "Campo login está vazio!")
	private String login;	
	@NotBlank(message = "Campo password está vazio!")
	private String password;
	
	public static Usuario toUsuario(UsuarioDto dto) {
		return new Usuario(
				dto.getId(),
				dto.getLogin(),
				dto.getPassword());
		
	}
	
	public static UsuarioDto fromUsuario(Usuario entity) {
		return new UsuarioDto(
				entity.getId(),
				entity.getLogin(),
				entity.getPassword());
		
	}	

}
