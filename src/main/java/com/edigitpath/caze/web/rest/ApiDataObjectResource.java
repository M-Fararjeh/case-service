package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.ApiDataObject;
import com.edigitpath.caze.service.ApiDataObjectService;
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
 * REST controller for managing ApiDataObject.
 */
@RestController
@RequestMapping("/api")
public class ApiDataObjectResource {

    private final Logger log = LoggerFactory.getLogger(ApiDataObjectResource.class);

    private static final String ENTITY_NAME = "apiDataObject";

    private final ApiDataObjectService apiDataObjectService;

    public ApiDataObjectResource(ApiDataObjectService apiDataObjectService) {
        this.apiDataObjectService = apiDataObjectService;
    }

    /**
     * POST  /api-data-objects : Create a new apiDataObject.
     *
     * @param apiDataObject the apiDataObject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new apiDataObject, or with status 400 (Bad Request) if the apiDataObject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api-data-objects")
    public ResponseEntity<ApiDataObject> createApiDataObject(@RequestBody ApiDataObject apiDataObject) throws URISyntaxException {
        log.debug("REST request to save ApiDataObject : {}", apiDataObject);
        if (apiDataObject.getId() != null) {
            throw new BadRequestAlertException("A new apiDataObject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApiDataObject result = apiDataObjectService.save(apiDataObject);
        return ResponseEntity.created(new URI("/api/api-data-objects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /api-data-objects : Updates an existing apiDataObject.
     *
     * @param apiDataObject the apiDataObject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated apiDataObject,
     * or with status 400 (Bad Request) if the apiDataObject is not valid,
     * or with status 500 (Internal Server Error) if the apiDataObject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/api-data-objects")
    public ResponseEntity<ApiDataObject> updateApiDataObject(@RequestBody ApiDataObject apiDataObject) throws URISyntaxException {
        log.debug("REST request to update ApiDataObject : {}", apiDataObject);
        if (apiDataObject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApiDataObject result = apiDataObjectService.save(apiDataObject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, apiDataObject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /api-data-objects : get all the apiDataObjects.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of apiDataObjects in body
     */
    @GetMapping("/api-data-objects")
    public List<ApiDataObject> getAllApiDataObjects(@RequestParam(required = false) String filter) {
        if ("casedataobject-is-null".equals(filter)) {
            log.debug("REST request to get all ApiDataObjects where caseDataObject is null");
            return apiDataObjectService.findAllWhereCaseDataObjectIsNull();
        }
        log.debug("REST request to get all ApiDataObjects");
        return apiDataObjectService.findAll();
    }

    /**
     * GET  /api-data-objects/:id : get the "id" apiDataObject.
     *
     * @param id the id of the apiDataObject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the apiDataObject, or with status 404 (Not Found)
     */
    @GetMapping("/api-data-objects/{id}")
    public ResponseEntity<ApiDataObject> getApiDataObject(@PathVariable Long id) {
        log.debug("REST request to get ApiDataObject : {}", id);
        Optional<ApiDataObject> apiDataObject = apiDataObjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(apiDataObject);
    }

    /**
     * DELETE  /api-data-objects/:id : delete the "id" apiDataObject.
     *
     * @param id the id of the apiDataObject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/api-data-objects/{id}")
    public ResponseEntity<Void> deleteApiDataObject(@PathVariable Long id) {
        log.debug("REST request to delete ApiDataObject : {}", id);
        apiDataObjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
