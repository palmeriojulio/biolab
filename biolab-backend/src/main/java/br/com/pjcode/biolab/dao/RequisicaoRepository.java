package br.com.pjcode.biolab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pjcode.biolab.domain.Requisicao;

@Repository
public interface RequisicaoRepository extends JpaRepository<Requisicao, Long> {

}
