package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.ApiDataObject;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ApiDataObject.
 */
public interface ApiDataObjectService {

    /**
     * Save a apiDataObject.
     *
     * @param apiDataObject the entity to save
     * @return the persisted entity
     */
    ApiDataObject save(ApiDataObject apiDataObject);

    /**
     * Get all the apiDataObjects.
     *
     * @return the list of entities
     */
    List<ApiDataObject> findAll();
    /**
     * Get all the ApiDataObjectDTO where CaseDataObject is null.
     *
     * @return the list of entities
     */
    List<ApiDataObject> findAllWhereCaseDataObjectIsNull();


    /**
     * Get the "id" apiDataObject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ApiDataObject> findOne(Long id);

    /**
     * Delete the "id" apiDataObject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
