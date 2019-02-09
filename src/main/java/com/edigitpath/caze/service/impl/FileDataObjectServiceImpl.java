package com.edigitpath.caze.service.impl;

import com.edigitpath.caze.service.FileDataObjectService;
import com.edigitpath.caze.domain.FileDataObject;
import com.edigitpath.caze.repository.FileDataObjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing FileDataObject.
 */
@Service
@Transactional
public class FileDataObjectServiceImpl implements FileDataObjectService {

    private final Logger log = LoggerFactory.getLogger(FileDataObjectServiceImpl.class);

    private final FileDataObjectRepository fileDataObjectRepository;

    public FileDataObjectServiceImpl(FileDataObjectRepository fileDataObjectRepository) {
        this.fileDataObjectRepository = fileDataObjectRepository;
    }

    /**
     * Save a fileDataObject.
     *
     * @param fileDataObject the entity to save
     * @return the persisted entity
     */
    @Override
    public FileDataObject save(FileDataObject fileDataObject) {
        log.debug("Request to save FileDataObject : {}", fileDataObject);
        return fileDataObjectRepository.save(fileDataObject);
    }

    /**
     * Get all the fileDataObjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FileDataObject> findAll() {
        log.debug("Request to get all FileDataObjects");
        return fileDataObjectRepository.findAll();
    }



    /**
     *  get all the fileDataObjects where CaseDataObject is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<FileDataObject> findAllWhereCaseDataObjectIsNull() {
        log.debug("Request to get all fileDataObjects where CaseDataObject is null");
        return StreamSupport
            .stream(fileDataObjectRepository.findAll().spliterator(), false)
            .filter(fileDataObject -> fileDataObject.getCaseDataObject() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one fileDataObject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FileDataObject> findOne(Long id) {
        log.debug("Request to get FileDataObject : {}", id);
        return fileDataObjectRepository.findById(id);
    }

    /**
     * Delete the fileDataObject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FileDataObject : {}", id);        fileDataObjectRepository.deleteById(id);
    }
}
