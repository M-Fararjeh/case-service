package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.ApiHeader;
import com.edigitpath.caze.service.ApiHeaderService;
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
 * REST controller for managing ApiHeader.
 */
@RestController
@RequestMapping("/api")
public class ApiHeaderResource {

    private final Logger log = LoggerFactory.getLogger(ApiHeaderResource.class);

    private static final String ENTITY_NAME = "apiHeader";

    private final ApiHeaderService apiHeaderService;

    public ApiHeaderResource(ApiHeaderService apiHeaderService) {
        this.apiHeaderService = apiHeaderService;
    }

    /**
     * POST  /api-headers : Create a new apiHeader.
     *
     * @param apiHeader the apiHeader to create
     * @return the ResponseEntity with status 201 (Created) and with body the new apiHeader, or with status 400 (Bad Request) if the apiHeader has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api-headers")
    public ResponseEntity<ApiHeader> createApiHeader(@RequestBody ApiHeader apiHeader) throws URISyntaxException {
        log.debug("REST request to save ApiHeader : {}", apiHeader);
        if (apiHeader.getId() != null) {
            throw new BadRequestAlertException("A new apiHeader cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApiHeader result = apiHeaderService.save(apiHeader);
        return ResponseEntity.created(new URI("/api/api-headers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /api-headers : Updates an existing apiHeader.
     *
     * @param apiHeader the apiHeader to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated apiHeader,
     * or with status 400 (Bad Request) if the apiHeader is not valid,
     * or with status 500 (Internal Server Error) if the apiHeader couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/api-headers")
    public ResponseEntity<ApiHeader> updateApiHeader(@RequestBody ApiHeader apiHeader) throws URISyntaxException {
        log.debug("REST request to update ApiHeader : {}", apiHeader);
        if (apiHeader.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApiHeader result = apiHeaderService.save(apiHeader);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, apiHeader.getId().toString()))
            .body(result);
    }

    /**
     * GET  /api-headers : get all the apiHeaders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of apiHeaders in body
     */
    @GetMapping("/api-headers")
    public List<ApiHeader> getAllApiHeaders() {
        log.debug("REST request to get all ApiHeaders");
        return apiHeaderService.findAll();
    }

    /**
     * GET  /api-headers/:id : get the "id" apiHeader.
     *
     * @param id the id of the apiHeader to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the apiHeader, or with status 404 (Not Found)
     */
    @GetMapping("/api-headers/{id}")
    public ResponseEntity<ApiHeader> getApiHeader(@PathVariable Long id) {
        log.debug("REST request to get ApiHeader : {}", id);
        Optional<ApiHeader> apiHeader = apiHeaderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(apiHeader);
    }

    /**
     * DELETE  /api-headers/:id : delete the "id" apiHeader.
     *
     * @param id the id of the apiHeader to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/api-headers/{id}")
    public ResponseEntity<Void> deleteApiHeader(@PathVariable Long id) {
        log.debug("REST request to delete ApiHeader : {}", id);
        apiHeaderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
