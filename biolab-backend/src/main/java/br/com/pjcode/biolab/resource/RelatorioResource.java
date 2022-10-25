package br.com.pjcode.biolab.resource;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pjcode.biolab.service.RelatorioService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/biolab")
public class RelatorioResource {

	final RelatorioService relatorioService;
	
	public RelatorioResource(RelatorioService relatorioService) {
		this.relatorioService = relatorioService;
	}
	
	@GetMapping("/relatorio/requisicao")
	public ResponseEntity<Resource> gerarRelatorioRequisicao(
			@RequestParam(value = "idRequisicao", required = false) Long idRequisicao) {
		return relatorioService.gerarRelatorioRequisicao("pdf", "requisicao.jasper", idRequisicao);
	}
}
