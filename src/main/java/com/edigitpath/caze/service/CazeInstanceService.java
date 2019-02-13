package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.CazeInstance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CazeInstance.
 */
public interface CazeInstanceService {

    /**
     * Save a cazeInstance.
     *
     * @param cazeInstance the entity to save
     * @return the persisted entity
     */
    CazeInstance save(CazeInstance cazeInstance);

    /**
     * Get all the cazeInstances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CazeInstance> findAll(Pageable pageable);

    /**
     * Get all the CazeInstance with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<CazeInstance> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" cazeInstance.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CazeInstance> findOne(Long id);

    /**
     * Delete the "id" cazeInstance.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
