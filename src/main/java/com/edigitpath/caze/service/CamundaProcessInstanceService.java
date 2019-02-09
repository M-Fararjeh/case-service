package com.edigitpath.caze.service;

import com.edigitpath.caze.domain.CamundaProcessInstance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CamundaProcessInstance.
 */
public interface CamundaProcessInstanceService {

    /**
     * Save a camundaProcessInstance.
     *
     * @param camundaProcessInstance the entity to save
     * @return the persisted entity
     */
    CamundaProcessInstance save(CamundaProcessInstance camundaProcessInstance);

    /**
     * Get all the camundaProcessInstances.
     *
     * @return the list of entities
     */
    List<CamundaProcessInstance> findAll();

    /**
     * Get all the CamundaProcessInstance with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<CamundaProcessInstance> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" camundaProcessInstance.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CamundaProcessInstance> findOne(Long id);

    /**
     * Delete the "id" camundaProcessInstance.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
