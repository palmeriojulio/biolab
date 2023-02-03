package br.com.pjcode.biolab.autenticacao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.pjcode.biolab.domain.Usuario;

public class DetalhesUsuarioData implements UserDetails { 

	private static final long serialVersionUID = 1L;
	
	private final Optional<Usuario> usuario;

	public DetalhesUsuarioData(Optional<Usuario> usuario) {
		this.usuario = usuario;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}
	
	/*
	 * retrorna um usuário vazio ou o da consulta
	 */
	@Override 
	public String getPassword() {
		return usuario.orElse(new Usuario()).getPassword();
	}

	@Override
	public String getUsername() {
		return usuario.orElse(new Usuario()).getLogin();
	}

	@Override
	public boolean isAccountNonExpired() {	
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
