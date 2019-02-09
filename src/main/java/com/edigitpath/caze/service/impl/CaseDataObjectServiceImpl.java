package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.CaseDataObjectService;
import com.edigitpath.caze.domain.CaseDataObject;
import com.edigitpath.caze.repository.CaseDataObjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CaseDataObject.
 */
@Service
@Transactional
public class CaseDataObjectServiceImpl implements CaseDataObjectService {

    private final Logger log = LoggerFactory.getLogger(CaseDataObjectServiceImpl.class);

    private final CaseDataObjectRepository caseDataObjectRepository;

    public CaseDataObjectServiceImpl(CaseDataObjectRepository caseDataObjectRepository) {
        this.caseDataObjectRepository = caseDataObjectRepository;
    }

    /**
     * Save a caseDataObject.
     *
     * @param caseDataObject the entity to save
     * @return the persisted entity
     */
    @Override
    public CaseDataObject save(CaseDataObject caseDataObject) {
        log.debug("Request to save CaseDataObject : {}", caseDataObject);
        return caseDataObjectRepository.save(caseDataObject);
    }

    /**
     * Get all the caseDataObjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CaseDataObject> findAll() {
        log.debug("Request to get all CaseDataObjects");
        return caseDataObjectRepository.findAll();
    }


    /**
     * Get one caseDataObject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CaseDataObject> findOne(Long id) {
        log.debug("Request to get CaseDataObject : {}", id);
        return caseDataObjectRepository.findById(id);
    }

    /**
     * Delete the caseDataObject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CaseDataObject : {}", id);        caseDataObjectRepository.deleteById(id);
    }
}
