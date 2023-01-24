package br.com.pjcode.biolab.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.pjcode.biolab.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	public Optional<Usuario> findByLogin(String login);

}
