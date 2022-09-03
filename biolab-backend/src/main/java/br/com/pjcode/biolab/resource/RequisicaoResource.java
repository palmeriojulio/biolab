package br.com.pjcode.biolab.resource;

import java.math.BigDecimal;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pjcode.biolab.dto.RequisicaoDto;
import br.com.pjcode.biolab.service.RequisicaoService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/biolab")
public class RequisicaoResource {

	final RequisicaoService requisicaoService;
	
	public RequisicaoResource(RequisicaoService requisicaoService) {
		this.requisicaoService = requisicaoService;
	}
	
	@PostMapping("/requisicao")
	public ResponseEntity<Object> salvarRequisicao(@RequestBody @Valid RequisicaoDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(requisicaoService.save(dto));
	}
	
	@GetMapping("/requisicao")
	public ResponseEntity<Object> calcularTotalExame(
			@RequestParam(name = "total") BigDecimal total,
			@RequestParam(name = "valorExame") BigDecimal valorExame,
			@RequestParam(name = "fator") String fator) {
		return ResponseEntity.status(HttpStatus.OK).body(requisicaoService.calcularTotalExame(total, valorExame, fator));
	}
}
