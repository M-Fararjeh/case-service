package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.DbDataObject;
import com.edigitpath.caze.service.DbDataObjectService;
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
 * REST controller for managing DbDataObject.
 */
@RestController
@RequestMapping("/api")
public class DbDataObjectResource {

    private final Logger log = LoggerFactory.getLogger(DbDataObjectResource.class);

    private static final String ENTITY_NAME = "dbDataObject";

    private final DbDataObjectService dbDataObjectService;

    public DbDataObjectResource(DbDataObjectService dbDataObjectService) {
        this.dbDataObjectService = dbDataObjectService;
    }

    /**
     * POST  /db-data-objects : Create a new dbDataObject.
     *
     * @param dbDataObject the dbDataObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dbDataObject, or with status 400 (Bad Request) if the dbDataObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/db-data-objects")
    public ResponseEntity<DbDataObject> createDbDataObject(@RequestBody DbDataObject dbDataObject) throws URISyntaxException {
        log.debug("REST request to save DbDataObject : {}", dbDataObject);
        if (dbDataObject.getId() != null) {
            throw new BadRequestAlertException("A new dbDataObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DbDataObject result = dbDataObjectService.save(dbDataObject);
        return ResponseEntity.created(new URI("/api/db-data-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /db-data-objects : Updates an existing dbDataObject.
     *
     * @param dbDataObject the dbDataObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dbDataObject,
     * or with status 400 (Bad Request) if the dbDataObject is not valid,
     * or with status 500 (Internal Server Error) if the dbDataObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/db-data-objects")
    public ResponseEntity<DbDataObject> updateDbDataObject(@RequestBody DbDataObject dbDataObject) throws URISyntaxException {
        log.debug("REST request to update DbDataObject : {}", dbDataObject);
        if (dbDataObject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DbDataObject result = dbDataObjectService.save(dbDataObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dbDataObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /db-data-objects : get all the dbDataObjects.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of dbDataObjects in body
     */
    @GetMapping("/db-data-objects")
    public List<DbDataObject> getAllDbDataObjects(@RequestParam(required = false) String filter) {
        if ("casedataobject-is-null".equals(filter)) {
            log.debug("REST request to get all DbDataObjects where caseDataObject is null");
            return dbDataObjectService.findAllWhereCaseDataObjectIsNull();
        }
        log.debug("REST request to get all DbDataObjects");
        return dbDataObjectService.findAll();
    }

    /**
     * GET  /db-data-objects/:id : get the "id" dbDataObject.
     *
     * @param id the id of the dbDataObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dbDataObject, or with status 404 (Not Found)
     */
    @GetMapping("/db-data-objects/{id}")
    public ResponseEntity<DbDataObject> getDbDataObject(@PathVariable Long id) {
        log.debug("REST request to get DbDataObject : {}", id);
        Optional<DbDataObject> dbDataObject = dbDataObjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dbDataObject);
    }

    /**
     * DELETE  /db-data-objects/:id : delete the "id" dbDataObject.
     *
     * @param id the id of the dbDataObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/db-data-objects/{id}")
    public ResponseEntity<Void> deleteDbDataObject(@PathVariable Long id) {
        log.debug("REST request to delete DbDataObject : {}", id);
        dbDataObjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
