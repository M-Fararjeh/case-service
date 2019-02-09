package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.CazeInstanceService;
import com.edigitpath.caze.domain.CazeInstance;
import com.edigitpath.caze.repository.CazeInstanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing CazeInstance.
 */
@Service
@Transactional
public class CazeInstanceServiceImpl implements CazeInstanceService {

    private final Logger log = LoggerFactory.getLogger(CazeInstanceServiceImpl.class);

    private final CazeInstanceRepository cazeInstanceRepository;

    public CazeInstanceServiceImpl(CazeInstanceRepository cazeInstanceRepository) {
        this.cazeInstanceRepository = cazeInstanceRepository;
    }

    /**
     * Save a cazeInstance.
     *
     * @param cazeInstance the entity to save
     * @return the persisted entity
     */
    @Override
    public CazeInstance save(CazeInstance cazeInstance) {
        log.debug("Request to save CazeInstance : {}", cazeInstance);
        return cazeInstanceRepository.save(cazeInstance);
    }

    /**
     * Get all the cazeInstances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CazeInstance> findAll(Pageable pageable) {
        log.debug("Request to get all CazeInstances");
        return cazeInstanceRepository.findAll(pageable);
    }


    /**
     * Get one cazeInstance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CazeInstance> findOne(Long id) {
        log.debug("Request to get CazeInstance : {}", id);
        return cazeInstanceRepository.findById(id);
    }

    /**
     * Delete the cazeInstance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CazeInstance : {}", id);        cazeInstanceRepository.deleteById(id);
    }
}
