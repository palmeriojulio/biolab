package br.com.pjcode.biolab.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.dao.PessoaRepository;
import br.com.pjcode.biolab.domain.Pessoa;
import br.com.pjcode.biolab.dto.PessoaDto;

@Service
public class PessoaService {
	
	final PessoaRepository pessoaRepository;	

	public PessoaService(PessoaRepository pessoaRepository) {
		this.pessoaRepository = pessoaRepository;
	}
	
	public List<PessoaDto> findAll() {
		try {
			return pessoaRepository.findAll().stream()
					.map(p -> PessoaDto.fromPessoa(p))
					.sorted((p1, p2) -> p1.getId().compareTo(p2.getId()))
					.collect(Collectors.toList());			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public PessoaDto findById(Long id) {
		try {
			var pessoa = pessoaRepository.findById(id);
			return convertOptionalReturn(pessoa);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}	

	public PessoaDto findByCpf(String cpf) {
		try {
			var pessoa = pessoaRepository.findByCpf(cpf);
			return convertReturn(pessoa);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public PessoaDto update(PessoaDto dto) {
		try {
			var pessoa = pessoaRepository.save(PessoaDto.toPessoa(dto));
			return convertReturn(pessoa);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public void delete(Long id) {
		try {
			pessoaRepository.deleteById(id);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return;
		}
	}

	public PessoaDto save(PessoaDto dto) {
		try {
			var pessoa = pessoaRepository.save(PessoaDto.toPessoa(dto));
			return convertReturn(pessoa);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}	
	
	private PessoaDto convertReturn(Pessoa pessoa) {
		try {
			if(Objects.nonNull(pessoa)) {
				return PessoaDto.fromPessoa(pessoa);
			} else {
				return null;			
			}			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private PessoaDto convertOptionalReturn(Optional<Pessoa> pessoa) {
		try {
			if(pessoa.isPresent()) {
				return PessoaDto.fromPessoa(pessoa.get());
			} else {
				return null;
			}			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	

}
