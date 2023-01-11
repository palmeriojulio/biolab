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

import br.com.pjcode.biolab.dto.PessoaDto;
import br.com.pjcode.biolab.service.PessoaService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/biolab")
public class PessoaResource {
	
	final PessoaService pessoaService;

	public PessoaResource(PessoaService pessoaService) {
		this.pessoaService = pessoaService;
	}
	
	@GetMapping("/pessoa")
	public ResponseEntity<Object> getAll() {
		return ResponseEntity.status(HttpStatus.OK).body(pessoaService.findAll());
	}
	
	@PutMapping("/pessoa")
	public ResponseEntity<Object> atualizarPessoa(@RequestBody @Valid PessoaDto pessoaDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaService.update(pessoaDto));		
	}
	
	@PostMapping("/pessoa")
	public ResponseEntity<Object> salvarPessoa(@RequestBody @Valid PessoaDto pessoaDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaService.save(pessoaDto));		
	}
	
	@DeleteMapping("/pessoa/{id}")
	public ResponseEntity<Object> deletarPessoa(@PathVariable(value = "id") Long id) {
		if(Objects.isNull(pessoaService.findById(id))) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa não encontrada");
		} else {
			pessoaService.delete(id);
			return ResponseEntity.status(HttpStatus.OK).body("Pessoa Excluída");
		}
	}
	
	@GetMapping("/pessoa/id/{id}")
	public ResponseEntity<Object> findById(
			@PathVariable(value = "id") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(pessoaService.findById(id));
	}
	
	@GetMapping("/pessoa/cpf/{cpf}")
	public ResponseEntity<Object> findByCpf(
			@PathVariable(value = "cpf") String cpf) {
		return ResponseEntity.status(HttpStatus.OK).body(pessoaService.findByCpf(cpf));
	}	

}
