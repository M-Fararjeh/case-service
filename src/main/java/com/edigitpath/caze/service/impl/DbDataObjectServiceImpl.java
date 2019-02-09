package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.DbDataObjectService;
import com.edigitpath.caze.domain.DbDataObject;
import com.edigitpath.caze.repository.DbDataObjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing DbDataObject.
 */
@Service
@Transactional
public class DbDataObjectServiceImpl implements DbDataObjectService {

    private final Logger log = LoggerFactory.getLogger(DbDataObjectServiceImpl.class);

    private final DbDataObjectRepository dbDataObjectRepository;

    public DbDataObjectServiceImpl(DbDataObjectRepository dbDataObjectRepository) {
        this.dbDataObjectRepository = dbDataObjectRepository;
    }

    /**
     * Save a dbDataObject.
     *
     * @param dbDataObject the entity to save
     * @return the persisted entity
     */
    @Override
    public DbDataObject save(DbDataObject dbDataObject) {
        log.debug("Request to save DbDataObject : {}", dbDataObject);
        return dbDataObjectRepository.save(dbDataObject);
    }

    /**
     * Get all the dbDataObjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DbDataObject> findAll() {
        log.debug("Request to get all DbDataObjects");
        return dbDataObjectRepository.findAll();
    }



    /**
     *  get all the dbDataObjects where CaseDataObject is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<DbDataObject> findAllWhereCaseDataObjectIsNull() {
        log.debug("Request to get all dbDataObjects where CaseDataObject is null");
        return StreamSupport
            .stream(dbDataObjectRepository.findAll().spliterator(), false)
            .filter(dbDataObject -> dbDataObject.getCaseDataObject() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one dbDataObject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DbDataObject> findOne(Long id) {
        log.debug("Request to get DbDataObject : {}", id);
        return dbDataObjectRepository.findById(id);
    }

    /**
     * Delete the dbDataObject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DbDataObject : {}", id);        dbDataObjectRepository.deleteById(id);
    }
}
