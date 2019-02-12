package com.edigitpath.caze.repository;

import com.edigitpath.caze.domain.CazeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CazeType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CazeTypeRepository extends JpaRepository<CazeType, Long> {

    CazeType findByName(String cazeTypeName);
}
