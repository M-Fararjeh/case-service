package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.CaseDataObject;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CaseDataObject.
 */
public interface CaseDataObjectService {

    /**
     * Save a caseDataObject.
     *
     * @param caseDataObject the entity to save
     * @return the persisted entity
     */
    CaseDataObject save(CaseDataObject caseDataObject);

    /**
     * Get all the caseDataObjects.
     *
     * @return the list of entities
     */
    List<CaseDataObject> findAll();


    /**
     * Get the "id" caseDataObject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CaseDataObject> findOne(Long id);

    /**
     * Delete the "id" caseDataObject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
