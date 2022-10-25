package br.com.pjcode.biolab.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.dao.RequisicaoRepository;
import br.com.pjcode.biolab.domain.Requisicao;
import br.com.pjcode.biolab.dto.RequisicaoRelatorioDto;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class RelatorioService {

	final RequisicaoRepository requisicaoRepository;
	
	public RelatorioService(RequisicaoRepository requisicaoRepository) {
		this.requisicaoRepository = requisicaoRepository;
	}

	public ResponseEntity<Resource> gerarRelatorioRequisicao(String tipoRelatorio, String nomeRelatorio, Long idRequisicao) {
		Map<String, Object> params = new HashMap<>();
		try {
			String pathImg = "/image/";
			InputStream logo = this.getClass().getResourceAsStream(pathImg + "biolab.jpeg");
			InputStream logoHeader = this.getClass().getResourceAsStream(pathImg + "biolabHeader.png");
			InputStream logoFooter = this.getClass().getResourceAsStream(pathImg + "biolabFooter.png");
			
			String jasperName = "requisicao.jasper";
			String pathRel = "/relatorio/";
			InputStream inputStream = getClass().getResourceAsStream(pathRel + jasperName);
			
			InputStream subReport1 = getClass().getResourceAsStream(pathRel + "exames.jasper");
						
			List<RequisicaoRelatorioDto> requisicoes = new ArrayList<>();
			var requisicao = requisicaoRepository.findById(idRequisicao);
			
			if(!requisicao.isPresent()) {
				return null;
			}
			
			var dto = convert(requisicao.get());
			params.put("SUBREPORT_DIR", subReport1);
			params.put("IMAGE_BIOLAB", logo);
			params.put("IMAGE_BIOLAB_HEADER", logoHeader);
			params.put("IMAGE_BIOLAB_FOOTER", logoFooter);
			
			requisicoes.add(dto);
			
			JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(requisicoes);
			
			JasperPrint p = JasperFillManager.fillReport(inputStream, params, beanColDataSource);
			
			byte [] retorno = JasperExportManager.exportReportToPdf(p);
			
			ByteArrayResource resource = new ByteArrayResource(retorno);
			
			return ResponseEntity.ok()
		            .contentType(MediaType.APPLICATION_OCTET_STREAM)
		            .contentLength(resource.contentLength())
		            .body(resource);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	private RequisicaoRelatorioDto convert(Requisicao requisicao) {
		return RequisicaoRelatorioDto.fromRequisicao(requisicao);
	}
}
