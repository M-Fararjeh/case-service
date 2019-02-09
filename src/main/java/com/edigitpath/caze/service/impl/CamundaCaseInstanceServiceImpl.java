package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.CamundaCaseInstanceService;
import com.edigitpath.caze.domain.CamundaCaseInstance;
import com.edigitpath.caze.repository.CamundaCaseInstanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CamundaCaseInstance.
 */
@Service
@Transactional
public class CamundaCaseInstanceServiceImpl implements CamundaCaseInstanceService {

    private final Logger log = LoggerFactory.getLogger(CamundaCaseInstanceServiceImpl.class);

    private final CamundaCaseInstanceRepository camundaCaseInstanceRepository;

    public CamundaCaseInstanceServiceImpl(CamundaCaseInstanceRepository camundaCaseInstanceRepository) {
        this.camundaCaseInstanceRepository = camundaCaseInstanceRepository;
    }

    /**
     * Save a camundaCaseInstance.
     *
     * @param camundaCaseInstance the entity to save
     * @return the persisted entity
     */
    @Override
    public CamundaCaseInstance save(CamundaCaseInstance camundaCaseInstance) {
        log.debug("Request to save CamundaCaseInstance : {}", camundaCaseInstance);
        return camundaCaseInstanceRepository.save(camundaCaseInstance);
    }

    /**
     * Get all the camundaCaseInstances.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CamundaCaseInstance> findAll() {
        log.debug("Request to get all CamundaCaseInstances");
        return camundaCaseInstanceRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the CamundaCaseInstance with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<CamundaCaseInstance> findAllWithEagerRelationships(Pageable pageable) {
        return camundaCaseInstanceRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one camundaCaseInstance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CamundaCaseInstance> findOne(Long id) {
        log.debug("Request to get CamundaCaseInstance : {}", id);
        return camundaCaseInstanceRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the camundaCaseInstance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CamundaCaseInstance : {}", id);        camundaCaseInstanceRepository.deleteById(id);
    }
}
