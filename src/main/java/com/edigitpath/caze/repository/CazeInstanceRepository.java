package com.edigitpath.caze.repository;

import com.edigitpath.caze.domain.CazeInstance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CazeInstance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CazeInstanceRepository extends JpaRepository<CazeInstance, Long> {

}
