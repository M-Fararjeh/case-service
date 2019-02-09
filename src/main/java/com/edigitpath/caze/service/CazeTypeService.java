package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.CazeType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CazeType.
 */
public interface CazeTypeService {

    /**
     * Save a cazeType.
     *
     * @param cazeType the entity to save
     * @return the persisted entity
     */
    CazeType save(CazeType cazeType);

    /**
     * Get all the cazeTypes.
     *
     * @return the list of entities
     */
    List<CazeType> findAll();


    /**
     * Get the "id" cazeType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CazeType> findOne(Long id);

    /**
     * Delete the "id" cazeType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
