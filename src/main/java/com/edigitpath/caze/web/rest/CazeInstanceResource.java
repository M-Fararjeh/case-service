package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.CazeInstance;
import com.edigitpath.caze.service.CazeInstanceService;
import com.edigitpath.caze.web.rest.errors.BadRequestAlertException;
import com.edigitpath.caze.web.rest.util.HeaderUtil;
import com.edigitpath.caze.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CazeInstance.
 */
@RestController
@RequestMapping("/api")
public class CazeInstanceResource {

    private final Logger log = LoggerFactory.getLogger(CazeInstanceResource.class);

    private static final String ENTITY_NAME = "cazeInstance";

    private final CazeInstanceService cazeInstanceService;

    public CazeInstanceResource(CazeInstanceService cazeInstanceService) {
        this.cazeInstanceService = cazeInstanceService;
    }

    /**
     * POST  /caze-instances : Create a new cazeInstance.
     *
     * @param cazeInstance the cazeInstance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cazeInstance, or with status 400 (Bad Request) if the cazeInstance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/caze-instances")
    public ResponseEntity<CazeInstance> createCazeInstance(@RequestBody CazeInstance cazeInstance) throws URISyntaxException {
        log.debug("REST request to save CazeInstance : {}", cazeInstance);
        if (cazeInstance.getId() != null) {
            throw new BadRequestAlertException("A new cazeInstance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CazeInstance result = cazeInstanceService.save(cazeInstance);
        return ResponseEntity.created(new URI("/api/caze-instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /caze-instances : Updates an existing cazeInstance.
     *
     * @param cazeInstance the cazeInstance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cazeInstance,
     * or with status 400 (Bad Request) if the cazeInstance is not valid,
     * or with status 500 (Internal Server Error) if the cazeInstance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/caze-instances")
    public ResponseEntity<CazeInstance> updateCazeInstance(@RequestBody CazeInstance cazeInstance) throws URISyntaxException {
        log.debug("REST request to update CazeInstance : {}", cazeInstance);
        if (cazeInstance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CazeInstance result = cazeInstanceService.save(cazeInstance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cazeInstance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /caze-instances : get all the cazeInstances.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cazeInstances in body
     */
    @GetMapping("/caze-instances")
    public ResponseEntity<List<CazeInstance>> getAllCazeInstances(Pageable pageable) {
        log.debug("REST request to get a page of CazeInstances");
        Page<CazeInstance> page = cazeInstanceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/caze-instances");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /caze-instances/:id : get the "id" cazeInstance.
     *
     * @param id the id of the cazeInstance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cazeInstance, or with status 404 (Not Found)
     */
    @GetMapping("/caze-instances/{id}")
    public ResponseEntity<CazeInstance> getCazeInstance(@PathVariable Long id) {
        log.debug("REST request to get CazeInstance : {}", id);
        Optional<CazeInstance> cazeInstance = cazeInstanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cazeInstance);
    }

    /**
     * DELETE  /caze-instances/:id : delete the "id" cazeInstance.
     *
     * @param id the id of the cazeInstance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/caze-instances/{id}")
    public ResponseEntity<Void> deleteCazeInstance(@PathVariable Long id) {
        log.debug("REST request to delete CazeInstance : {}", id);
        cazeInstanceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
