package br.com.pjcode.biolab.service;

import java.util.Objects;

import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.dao.ExameRepository;
import br.com.pjcode.biolab.dto.ExameDto;

@Service
public class ExameService {

	final ExameRepository exameRepository;
	
	public ExameService(ExameRepository exameRepository) {
		this.exameRepository = exameRepository;
	}
	
	public ExameDto save(ExameDto dto) throws Exception {
		try {
			var exame =  exameRepository.save(ExameDto.toExame(dto));
			if(Objects.nonNull(exame)) {
				return ExameDto.fromExame(exame);
			} else {
				return null;
			}
		
		} catch (RuntimeException e) {
			throw new Exception(""+e.getMessage());
		}
	}
}
