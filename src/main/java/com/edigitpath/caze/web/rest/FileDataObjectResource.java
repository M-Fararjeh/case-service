package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.FileDataObject;
import com.edigitpath.caze.service.FileDataObjectService;
import com.edigitpath.caze.web.rest.errors.BadRequestAlertException;
import com.edigitpath.caze.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing FileDataObject.
 */
@RestController
@RequestMapping("/api")
public class FileDataObjectResource {

    private final Logger log = LoggerFactory.getLogger(FileDataObjectResource.class);

    private static final String ENTITY_NAME = "fileDataObject";

    private final FileDataObjectService fileDataObjectService;

    public FileDataObjectResource(FileDataObjectService fileDataObjectService) {
        this.fileDataObjectService = fileDataObjectService;
    }

    /**
     * POST  /file-data-objects : Create a new fileDataObject.
     *
     * @param fileDataObject the fileDataObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fileDataObject, or with status 400 (Bad Request) if the fileDataObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/file-data-objects")
    public ResponseEntity<FileDataObject> createFileDataObject(@RequestBody FileDataObject fileDataObject) throws URISyntaxException {
        log.debug("REST request to save FileDataObject : {}", fileDataObject);
        if (fileDataObject.getId() != null) {
            throw new BadRequestAlertException("A new fileDataObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FileDataObject result = fileDataObjectService.save(fileDataObject);
        return ResponseEntity.created(new URI("/api/file-data-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /file-data-objects : Updates an existing fileDataObject.
     *
     * @param fileDataObject the fileDataObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fileDataObject,
     * or with status 400 (Bad Request) if the fileDataObject is not valid,
     * or with status 500 (Internal Server Error) if the fileDataObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/file-data-objects")
    public ResponseEntity<FileDataObject> updateFileDataObject(@RequestBody FileDataObject fileDataObject) throws URISyntaxException {
        log.debug("REST request to update FileDataObject : {}", fileDataObject);
        if (fileDataObject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FileDataObject result = fileDataObjectService.save(fileDataObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fileDataObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /file-data-objects : get all the fileDataObjects.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of fileDataObjects in body
     */
    @GetMapping("/file-data-objects")
    public List<FileDataObject> getAllFileDataObjects(@RequestParam(required = false) String filter) {
        if ("casedataobject-is-null".equals(filter)) {
            log.debug("REST request to get all FileDataObjects where caseDataObject is null");
            return fileDataObjectService.findAllWhereCaseDataObjectIsNull();
        }
        log.debug("REST request to get all FileDataObjects");
        return fileDataObjectService.findAll();
    }

    /**
     * GET  /file-data-objects/:id : get the "id" fileDataObject.
     *
     * @param id the id of the fileDataObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fileDataObject, or with status 404 (Not Found)
     */
    @GetMapping("/file-data-objects/{id}")
    public ResponseEntity<FileDataObject> getFileDataObject(@PathVariable Long id) {
        log.debug("REST request to get FileDataObject : {}", id);
        Optional<FileDataObject> fileDataObject = fileDataObjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fileDataObject);
    }

    /**
     * DELETE  /file-data-objects/:id : delete the "id" fileDataObject.
     *
     * @param id the id of the fileDataObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/file-data-objects/{id}")
    public ResponseEntity<Void> deleteFileDataObject(@PathVariable Long id) {
        log.debug("REST request to delete FileDataObject : {}", id);
        fileDataObjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
