package br.com.pjcode.biolab.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.dao.ExameRepository;
import br.com.pjcode.biolab.dao.PessoaRepository;
import br.com.pjcode.biolab.dao.RequisicaoRepository;
import br.com.pjcode.biolab.domain.Exame;
import br.com.pjcode.biolab.domain.Pessoa;
import br.com.pjcode.biolab.domain.Requisicao;
import br.com.pjcode.biolab.dto.ExameDto;
import br.com.pjcode.biolab.dto.PessoaDto;
import br.com.pjcode.biolab.dto.RequisicaoDto;

@Service
public class RequisicaoService {

	final RequisicaoRepository requisicaoRepository;
	
	final PessoaRepository pessoaRepository;
	
	final ExameRepository exameRepository;
	
	public RequisicaoService(RequisicaoRepository requisicaoRepository,
			PessoaRepository pessoaRepository, ExameRepository exameRepository) {
		this.requisicaoRepository = requisicaoRepository;
		this.pessoaRepository = pessoaRepository;
		this.exameRepository = exameRepository;
	}
	
	public RequisicaoDto save(RequisicaoDto dto) {
		try {
			var pessoa = regraPessoa(dto.getPessoa());
			var exames = regraExames(dto.getExames());
			return regraRequisicao(dto, pessoa, exames);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<RequisicaoDto> findAll() {
		try {
			return requisicaoRepository.findAll().stream()
					.map(p -> RequisicaoDto.fromRequisicao(p))
					.sorted((e1, e2) -> e1.getId().compareTo(e2.getId()))
					.collect(Collectors.toList());
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public RequisicaoDto findById(Long id) {
		try {
			var requisicao = requisicaoRepository.findById(id);
			return convertOptionalReturn(requisicao);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private List<Exame> regraExames(List<ExameDto> exames) {
		try {
			return exames.stream()
					.map(e -> exameRepository.findById(e.getId()).get())
					.sorted((e1, e2) -> e1.getId().compareTo(e2.getId()))
					.collect(Collectors.toList());			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}

	public BigDecimal calcularTotalExame(BigDecimal total, BigDecimal valorExame, String fator) {
		try {			
			switch (fator) {
				case "SOMA":
					return total.add(valorExame);
				case "SUBTRACAO":
					return total.subtract(valorExame);
				default:
					break;
			}
			return total; 
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}

	private RequisicaoDto regraRequisicao(RequisicaoDto dto, Pessoa pessoa, List<Exame> emaxes) {
		try {
			var requisicao = RequisicaoDto.toRequisicao(dto);
			requisicao.setPessoa(pessoa);
			requisicao.setExames(emaxes);
			requisicao.setDataCriacaoRequisicao(LocalDate.now());
			return RequisicaoDto.fromRequisicao(requisicaoRepository.save(requisicao));
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}

	private Pessoa regraPessoa(PessoaDto dto) {
		try {			
			if(Objects.isNull(dto.getId())) {
				return pessoaRepository.save(PessoaDto.toPessoa(dto));
			} else {
				return PessoaDto.toPessoa(dto);
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private RequisicaoDto convertOptionalReturn(Optional<Requisicao> requisicao) {
		try {
			if(requisicao.isPresent()) {
				return RequisicaoDto.fromRequisicao(requisicao.get());
			} else {
				return null;
			}			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
}
