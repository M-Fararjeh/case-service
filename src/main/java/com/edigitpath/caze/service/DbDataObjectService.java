package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.DbDataObject;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DbDataObject.
 */
public interface DbDataObjectService {

    /**
     * Save a dbDataObject.
     *
     * @param dbDataObject the entity to save
     * @return the persisted entity
     */
    DbDataObject save(DbDataObject dbDataObject);

    /**
     * Get all the dbDataObjects.
     *
     * @return the list of entities
     */
    List<DbDataObject> findAll();
    /**
     * Get all the DbDataObjectDTO where CaseDataObject is null.
     *
     * @return the list of entities
     */
    List<DbDataObject> findAllWhereCaseDataObjectIsNull();


    /**
     * Get the "id" dbDataObject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DbDataObject> findOne(Long id);

    /**
     * Delete the "id" dbDataObject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
