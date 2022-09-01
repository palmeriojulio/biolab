package br.com.pjcode.biolab.service;

import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.domain.Pessoa;

@Service
public class PessoaService {
	
	final Pessoa pessoaRepository;

	public PessoaService(Pessoa pessoaRepository) {
		this.pessoaRepository = pessoaRepository;
	}	
	

}
