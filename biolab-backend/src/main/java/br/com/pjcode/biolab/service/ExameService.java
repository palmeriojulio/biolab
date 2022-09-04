package br.com.pjcode.biolab.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.dao.ExameRepository;
import br.com.pjcode.biolab.domain.Exame;
import br.com.pjcode.biolab.dto.ExameDto;

@Service
public class ExameService {

	final ExameRepository exameRepository;
	
	public ExameService(ExameRepository exameRepository) {
		this.exameRepository = exameRepository;
	}
	
	public List<ExameDto> findAll() {
		try {
			return exameRepository.findAll().stream()
					.map(p -> ExameDto.fromExame(p))
					.collect(Collectors.toList());			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public ExameDto findById(Long id) {
		try {
			var exame = exameRepository.findById(id);
			return convertOptionalReturn(exame); 			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}			
	}
	
	public ExameDto update(ExameDto dto) {
		try {
			var exame = exameRepository.save(ExameDto.toExame(dto));
			return convertReturn(exame);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}	

	public void delete(Long id) {
		try {
			exameRepository.deleteById(id);			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return;
		}
	}
	
	public ExameDto save(ExameDto dto) throws Exception {
		try {
			var exame =  exameRepository.save(ExameDto.toExame(dto));
			return convertReturn(exame);		
		} catch (RuntimeException e) {
			throw new Exception(""+e.getMessage());
		}
	}
	
	private ExameDto convertReturn(Exame exame) {
		try {
			if(Objects.nonNull(exame)) {
				return ExameDto.fromExame(exame);
			} else {
				return null;			}
			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private ExameDto convertOptionalReturn(Optional<Exame> exame) {
		try {
			if(exame.isPresent()) {
				return ExameDto.fromExame(exame.get());
			} else {
				return null;			
			}			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
