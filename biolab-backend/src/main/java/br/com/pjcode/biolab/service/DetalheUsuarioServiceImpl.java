package br.com.pjcode.biolab.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import br.com.pjcode.biolab.autenticacao.DetalhesUsuarioData;
import br.com.pjcode.biolab.dao.UsuarioRepository;
import br.com.pjcode.biolab.domain.Usuario;

@Component
public class DetalheUsuarioServiceImpl implements UserDetailsService {
	
	/**
	 * Injeção de dependência do repositório de usuario.
	 */
	private final UsuarioRepository usuarioRepository;

	public DetalheUsuarioServiceImpl(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	/**
	 * Esse método 
	 * 
	 * @param String
	 * @return Um objeto Optional.
	 * @exception Retrona mensagem de erro ou o objeto optional.
	 */	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> usuario = usuarioRepository.findByLogin(username);
		if(usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuário [" + username + "] não encontrado");
		}
		
		return new DetalhesUsuarioData(usuario);
	}

}
