package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.CamundaProcessInstanceService;
import com.edigitpath.caze.domain.CamundaProcessInstance;
import com.edigitpath.caze.repository.CamundaProcessInstanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CamundaProcessInstance.
 */
@Service
@Transactional
public class CamundaProcessInstanceServiceImpl implements CamundaProcessInstanceService {

    private final Logger log = LoggerFactory.getLogger(CamundaProcessInstanceServiceImpl.class);

    private final CamundaProcessInstanceRepository camundaProcessInstanceRepository;

    public CamundaProcessInstanceServiceImpl(CamundaProcessInstanceRepository camundaProcessInstanceRepository) {
        this.camundaProcessInstanceRepository = camundaProcessInstanceRepository;
    }

    /**
     * Save a camundaProcessInstance.
     *
     * @param camundaProcessInstance the entity to save
     * @return the persisted entity
     */
    @Override
    public CamundaProcessInstance save(CamundaProcessInstance camundaProcessInstance) {
        log.debug("Request to save CamundaProcessInstance : {}", camundaProcessInstance);
        return camundaProcessInstanceRepository.save(camundaProcessInstance);
    }

    /**
     * Get all the camundaProcessInstances.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CamundaProcessInstance> findAll() {
        log.debug("Request to get all CamundaProcessInstances");
        return camundaProcessInstanceRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the CamundaProcessInstance with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<CamundaProcessInstance> findAllWithEagerRelationships(Pageable pageable) {
        return camundaProcessInstanceRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one camundaProcessInstance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CamundaProcessInstance> findOne(Long id) {
        log.debug("Request to get CamundaProcessInstance : {}", id);
        return camundaProcessInstanceRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the camundaProcessInstance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CamundaProcessInstance : {}", id);        camundaProcessInstanceRepository.deleteById(id);
    }
}
