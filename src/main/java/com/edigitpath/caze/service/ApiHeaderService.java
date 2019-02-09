package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.ApiHeader;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ApiHeader.
 */
public interface ApiHeaderService {

    /**
     * Save a apiHeader.
     *
     * @param apiHeader the entity to save
     * @return the persisted entity
     */
    ApiHeader save(ApiHeader apiHeader);

    /**
     * Get all the apiHeaders.
     *
     * @return the list of entities
     */
    List<ApiHeader> findAll();


    /**
     * Get the "id" apiHeader.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ApiHeader> findOne(Long id);

    /**
     * Delete the "id" apiHeader.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
