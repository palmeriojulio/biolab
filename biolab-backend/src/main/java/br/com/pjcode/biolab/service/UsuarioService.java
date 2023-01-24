package br.com.pjcode.biolab.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.pjcode.biolab.dao.UsuarioRepository;
import br.com.pjcode.biolab.domain.Usuario;
import br.com.pjcode.biolab.dto.UsuarioDto;

@Service
public class UsuarioService {

	final UsuarioRepository usuarioRepository;

	public UsuarioService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	public List<UsuarioDto> findAll() {
		try {
			return usuarioRepository.findAll().stream()
					.map(u -> UsuarioDto.fromUsuario(u))
					.sorted((u1, u2)-> u1.getId().compareTo(u2.getId()))
					.collect(Collectors.toList());
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	public UsuarioDto save(UsuarioDto dto) {
		try {
			var usuario = usuarioRepository.save(UsuarioDto.toUsuario(dto));			
			return convertReturn(usuario);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Optional<Usuario> findByLogin(String login) {
		try {
			var usuario = usuarioRepository.findByLogin(login);
			return usuario;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}

	private UsuarioDto convertReturn(Usuario usuario) {
		try {
			if(Objects.nonNull(usuario)) {
				return UsuarioDto.fromUsuario(usuario);
			} else {
				return null;			
			}			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private UsuarioDto convertOptionalReturn(Optional<Usuario> usuario) {
		try {
			if(usuario.isPresent()) {
				return UsuarioDto.fromUsuario(usuario.get());
			} else {
				return null;
			}			
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
