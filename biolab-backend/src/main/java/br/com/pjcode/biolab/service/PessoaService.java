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
	
	// Injeção de dependência
	final PessoaRepository pessoaRepository;	

	public PessoaService(PessoaRepository pessoaRepository) {
		super();
		this.pessoaRepository = pessoaRepository;
	}
	
	public List<PessoaDto> listAll() {
		return pessoaRepository.findAll().stream()
				.map(p -> PessoaDto.fromPessoa(p))
				.collect(Collectors.toList());
	}
	
	public PessoaDto buscarId(Long id) {
		var pessoa = pessoaRepository.findById(id);
		return convertOptionalReturn(pessoa);
	}
	

	public PessoaDto buscarCpf(String cpf) {
		var pessoa = pessoaRepository.findByCpf(cpf);
		return convertReturn(pessoa);
	}
	
	public PessoaDto update(PessoaDto dto) {
		var pessoa = pessoaRepository.save(PessoaDto.toPessoa(dto));
		return convertReturn(pessoa);
	}
	
	public void delete(Long id) {
		pessoaRepository.deleteById(id);
	}

	public PessoaDto save(PessoaDto dto) {
		var pessoa = pessoaRepository.save(PessoaDto.toPessoa(dto));
		return convertReturn(pessoa);
	}	
	
	private PessoaDto convertReturn(Pessoa pessoa) {
		if(Objects.nonNull(pessoa)) {
			return PessoaDto.fromPessoa(pessoa);
		} else {
			return null;			
		}
	}
	
	private PessoaDto convertOptionalReturn(Optional<Pessoa> pessoa) {
		if(pessoa.isPresent()) {
			return PessoaDto.fromPessoa(pessoa.get());
		} else {
			return null;
		}
	}
	
	
	

}
