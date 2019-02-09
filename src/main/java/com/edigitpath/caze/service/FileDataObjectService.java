package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.FileDataObject;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FileDataObject.
 */
public interface FileDataObjectService {

    /**
     * Save a fileDataObject.
     *
     * @param fileDataObject the entity to save
     * @return the persisted entity
     */
    FileDataObject save(FileDataObject fileDataObject);

    /**
     * Get all the fileDataObjects.
     *
     * @return the list of entities
     */
    List<FileDataObject> findAll();
    /**
     * Get all the FileDataObjectDTO where CaseDataObject is null.
     *
     * @return the list of entities
     */
    List<FileDataObject> findAllWhereCaseDataObjectIsNull();


    /**
     * Get the "id" fileDataObject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FileDataObject> findOne(Long id);

    /**
     * Delete the "id" fileDataObject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
