package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.ApiDataObjectService;
import com.edigitpath.caze.domain.ApiDataObject;
import com.edigitpath.caze.repository.ApiDataObjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing ApiDataObject.
 */
@Service
@Transactional
public class ApiDataObjectServiceImpl implements ApiDataObjectService {

    private final Logger log = LoggerFactory.getLogger(ApiDataObjectServiceImpl.class);

    private final ApiDataObjectRepository apiDataObjectRepository;

    public ApiDataObjectServiceImpl(ApiDataObjectRepository apiDataObjectRepository) {
        this.apiDataObjectRepository = apiDataObjectRepository;
    }

    /**
     * Save a apiDataObject.
     *
     * @param apiDataObject the entity to save
     * @return the persisted entity
     */
    @Override
    public ApiDataObject save(ApiDataObject apiDataObject) {
        log.debug("Request to save ApiDataObject : {}", apiDataObject);
        return apiDataObjectRepository.save(apiDataObject);
    }

    /**
     * Get all the apiDataObjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ApiDataObject> findAll() {
        log.debug("Request to get all ApiDataObjects");
        return apiDataObjectRepository.findAll();
    }



    /**
     *  get all the apiDataObjects where CaseDataObject is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<ApiDataObject> findAllWhereCaseDataObjectIsNull() {
        log.debug("Request to get all apiDataObjects where CaseDataObject is null");
        return StreamSupport
            .stream(apiDataObjectRepository.findAll().spliterator(), false)
            .filter(apiDataObject -> apiDataObject.getCaseDataObject() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one apiDataObject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ApiDataObject> findOne(Long id) {
        log.debug("Request to get ApiDataObject : {}", id);
        return apiDataObjectRepository.findById(id);
    }

    /**
     * Delete the apiDataObject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ApiDataObject : {}", id);        apiDataObjectRepository.deleteById(id);
    }
}
