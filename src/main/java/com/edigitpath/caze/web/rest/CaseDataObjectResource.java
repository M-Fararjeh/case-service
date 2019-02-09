package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.CaseDataObject;
import com.edigitpath.caze.service.CaseDataObjectService;
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

/**
 * REST controller for managing CaseDataObject.
 */
@RestController
@RequestMapping("/api")
public class CaseDataObjectResource {

    private final Logger log = LoggerFactory.getLogger(CaseDataObjectResource.class);

    private static final String ENTITY_NAME = "caseDataObject";

    private final CaseDataObjectService caseDataObjectService;

    public CaseDataObjectResource(CaseDataObjectService caseDataObjectService) {
        this.caseDataObjectService = caseDataObjectService;
    }

    /**
     * POST  /case-data-objects : Create a new caseDataObject.
     *
     * @param caseDataObject the caseDataObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new caseDataObject, or with status 400 (Bad Request) if the caseDataObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/case-data-objects")
    public ResponseEntity<CaseDataObject> createCaseDataObject(@RequestBody CaseDataObject caseDataObject) throws URISyntaxException {
        log.debug("REST request to save CaseDataObject : {}", caseDataObject);
        if (caseDataObject.getId() != null) {
            throw new BadRequestAlertException("A new caseDataObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CaseDataObject result = caseDataObjectService.save(caseDataObject);
        return ResponseEntity.created(new URI("/api/case-data-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /case-data-objects : Updates an existing caseDataObject.
     *
     * @param caseDataObject the caseDataObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated caseDataObject,
     * or with status 400 (Bad Request) if the caseDataObject is not valid,
     * or with status 500 (Internal Server Error) if the caseDataObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/case-data-objects")
    public ResponseEntity<CaseDataObject> updateCaseDataObject(@RequestBody CaseDataObject caseDataObject) throws URISyntaxException {
        log.debug("REST request to update CaseDataObject : {}", caseDataObject);
        if (caseDataObject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CaseDataObject result = caseDataObjectService.save(caseDataObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, caseDataObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /case-data-objects : get all the caseDataObjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of caseDataObjects in body
     */
    @GetMapping("/case-data-objects")
    public List<CaseDataObject> getAllCaseDataObjects() {
        log.debug("REST request to get all CaseDataObjects");
        return caseDataObjectService.findAll();
    }

    /**
     * GET  /case-data-objects/:id : get the "id" caseDataObject.
     *
     * @param id the id of the caseDataObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the caseDataObject, or with status 404 (Not Found)
     */
    @GetMapping("/case-data-objects/{id}")
    public ResponseEntity<CaseDataObject> getCaseDataObject(@PathVariable Long id) {
        log.debug("REST request to get CaseDataObject : {}", id);
        Optional<CaseDataObject> caseDataObject = caseDataObjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(caseDataObject);
    }

    /**
     * DELETE  /case-data-objects/:id : delete the "id" caseDataObject.
     *
     * @param id the id of the caseDataObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/case-data-objects/{id}")
    public ResponseEntity<Void> deleteCaseDataObject(@PathVariable Long id) {
        log.debug("REST request to delete CaseDataObject : {}", id);
        caseDataObjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
