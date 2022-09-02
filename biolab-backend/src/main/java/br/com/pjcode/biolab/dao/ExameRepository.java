package br.com.pjcode.biolab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pjcode.biolab.domain.Exame;

@Repository
public interface ExameRepository extends JpaRepository<Exame, Long> {

}
