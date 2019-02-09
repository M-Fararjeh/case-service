package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.ApiHeaderService;
import com.edigitpath.caze.domain.ApiHeader;
import com.edigitpath.caze.repository.ApiHeaderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ApiHeader.
 */
@Service
@Transactional
public class ApiHeaderServiceImpl implements ApiHeaderService {

    private final Logger log = LoggerFactory.getLogger(ApiHeaderServiceImpl.class);

    private final ApiHeaderRepository apiHeaderRepository;

    public ApiHeaderServiceImpl(ApiHeaderRepository apiHeaderRepository) {
        this.apiHeaderRepository = apiHeaderRepository;
    }

    /**
     * Save a apiHeader.
     *
     * @param apiHeader the entity to save
     * @return the persisted entity
     */
    @Override
    public ApiHeader save(ApiHeader apiHeader) {
        log.debug("Request to save ApiHeader : {}", apiHeader);
        return apiHeaderRepository.save(apiHeader);
    }

    /**
     * Get all the apiHeaders.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ApiHeader> findAll() {
        log.debug("Request to get all ApiHeaders");
        return apiHeaderRepository.findAll();
    }


    /**
     * Get one apiHeader by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ApiHeader> findOne(Long id) {
        log.debug("Request to get ApiHeader : {}", id);
        return apiHeaderRepository.findById(id);
    }

    /**
     * Delete the apiHeader by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ApiHeader : {}", id);        apiHeaderRepository.deleteById(id);
    }
}
