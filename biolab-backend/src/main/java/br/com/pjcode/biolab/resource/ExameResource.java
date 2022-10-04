package br.com.pjcode.biolab.resource;

import java.util.Objects;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pjcode.biolab.dto.ExameDto;
import br.com.pjcode.biolab.service.ExameService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/biolab")
public class ExameResource {
	
	final ExameService exameService;
	
	public ExameResource(ExameService exameService) {
		this.exameService = exameService;
	}
	
	@GetMapping("/exame")
	public ResponseEntity<Object> getAll() {
		return ResponseEntity.status(HttpStatus.OK).body(exameService.findAll());
	}
	
	@PutMapping("/exame")
	public ResponseEntity<Object> atualizarExame(@RequestBody @Valid ExameDto exame) {
		return ResponseEntity.status(HttpStatus.CREATED).body(exameService.update(exame));
	}
	
	@PostMapping("/exame")
	public ResponseEntity<Object> salvarExame(@RequestBody @Valid ExameDto exame) throws Exception {
		return ResponseEntity.status(HttpStatus.CREATED).body(exameService.save(exame));
	}
	
	@GetMapping("/exame/{id}")
	public ResponseEntity<Object> getById(@PathVariable(value = "id") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(exameService.findById(id));
	}
	
	@DeleteMapping("/exame/{id}")
	public ResponseEntity<Object> deletarExame(
			@PathVariable(value = "id") Long id) {
		if(Objects.isNull(exameService.findById(id))) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exame não encontrado!");
		} else {
			exameService.delete(id);
			return ResponseEntity.status(HttpStatus.OK).body("Exame excluído!");
		}
	}
}
