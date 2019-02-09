package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.CazeTypeService;
import com.edigitpath.caze.domain.CazeType;
import com.edigitpath.caze.repository.CazeTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CazeType.
 */
@Service
@Transactional
public class CazeTypeServiceImpl implements CazeTypeService {

    private final Logger log = LoggerFactory.getLogger(CazeTypeServiceImpl.class);

    private final CazeTypeRepository cazeTypeRepository;

    public CazeTypeServiceImpl(CazeTypeRepository cazeTypeRepository) {
        this.cazeTypeRepository = cazeTypeRepository;
    }

    /**
     * Save a cazeType.
     *
     * @param cazeType the entity to save
     * @return the persisted entity
     */
    @Override
    public CazeType save(CazeType cazeType) {
        log.debug("Request to save CazeType : {}", cazeType);
        return cazeTypeRepository.save(cazeType);
    }

    /**
     * Get all the cazeTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CazeType> findAll() {
        log.debug("Request to get all CazeTypes");
        return cazeTypeRepository.findAll();
    }


    /**
     * Get one cazeType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CazeType> findOne(Long id) {
        log.debug("Request to get CazeType : {}", id);
        return cazeTypeRepository.findById(id);
    }

    /**
     * Delete the cazeType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CazeType : {}", id);        cazeTypeRepository.deleteById(id);
    }
}
