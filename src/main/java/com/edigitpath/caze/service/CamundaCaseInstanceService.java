package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.CamundaCaseInstance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CamundaCaseInstance.
 */
public interface CamundaCaseInstanceService {

    /**
     * Save a camundaCaseInstance.
     *
     * @param camundaCaseInstance the entity to save
     * @return the persisted entity
     */
    CamundaCaseInstance save(CamundaCaseInstance camundaCaseInstance);

    /**
     * Get all the camundaCaseInstances.
     *
     * @return the list of entities
     */
    List<CamundaCaseInstance> findAll();

    /**
     * Get all the CamundaCaseInstance with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<CamundaCaseInstance> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" camundaCaseInstance.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CamundaCaseInstance> findOne(Long id);

    /**
     * Delete the "id" camundaCaseInstance.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
