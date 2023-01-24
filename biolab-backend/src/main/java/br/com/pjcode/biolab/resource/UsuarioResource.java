package br.com.pjcode.biolab.resource;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pjcode.biolab.dto.UsuarioDto;
import br.com.pjcode.biolab.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/biolab")
public class UsuarioResource {
	
	final UsuarioService usuarioService;
	
	public UsuarioResource (UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}
	
	@GetMapping("/usuarios")
	public ResponseEntity<Object> getAll() {		
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());		
	}
	
	@PostMapping("/usuario")
	public ResponseEntity<Object> salvarUsuario(@RequestBody @Valid UsuarioDto usuarioDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuarioDto));
	}
	

}
