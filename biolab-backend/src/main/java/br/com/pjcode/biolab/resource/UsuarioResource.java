package br.com.pjcode.biolab.resource;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pjcode.biolab.domain.Usuario;
import br.com.pjcode.biolab.dto.UsuarioDto;
import br.com.pjcode.biolab.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/biolab")
public class UsuarioResource {
	
	final UsuarioService usuarioService;
	final PasswordEncoder encoder;
	
	public UsuarioResource(UsuarioService usuarioService, PasswordEncoder encoder) {
		this.usuarioService = usuarioService;
		this.encoder = encoder;
	}

	@GetMapping("/usuarios")
	public ResponseEntity<Object> getAll() {		
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());		
	}
	
	@PostMapping("/usuario")
	public ResponseEntity<Object> salvarUsuario(@RequestBody @Valid UsuarioDto usuarioDto) {
		usuarioDto.setPassword(encoder.encode(usuarioDto.getPassword()));
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuarioDto));
	}
	
	@GetMapping("/validarSenha")
	public ResponseEntity<Object> validarSenha(@RequestParam String login, @RequestParam String password){
		
		//Recebe uma string com o login, chama o metodo que verifica se exeste esse login, se não existir retorna false.
		if(usuarioService.findByLogin(login).isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		}
		//Pegando usuario tendro do Optional e atribuindo a variável usuario.
		Usuario usuario = usuarioService.findByLogin(login).get();
		
		//Verificando se a senha informada e igual a encripitada que vem do banco.
		boolean valido = encoder.matches(password, usuario.getPassword());
		
		//Se a senha for válida, status recebe ok se não recebe UNAUTHORIZED.
		HttpStatus status = (valido)  ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
		
        return ResponseEntity.status(status).body(valido);
	}
	

}
