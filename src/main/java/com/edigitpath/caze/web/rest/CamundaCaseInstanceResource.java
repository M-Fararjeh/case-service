package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.CamundaCaseInstance;
import com.edigitpath.caze.service.CamundaCaseInstanceService;
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
 * REST controller for managing CamundaCaseInstance.
 */
@RestController
@RequestMapping("/api")
public class CamundaCaseInstanceResource {

    private final Logger log = LoggerFactory.getLogger(CamundaCaseInstanceResource.class);

    private static final String ENTITY_NAME = "camundaCaseInstance";

    private final CamundaCaseInstanceService camundaCaseInstanceService;

    public CamundaCaseInstanceResource(CamundaCaseInstanceService camundaCaseInstanceService) {
        this.camundaCaseInstanceService = camundaCaseInstanceService;
    }

    /**
     * POST  /camunda-case-instances : Create a new camundaCaseInstance.
     *
     * @param camundaCaseInstance the camundaCaseInstance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new camundaCaseInstance, or with status 400 (Bad Request) if the camundaCaseInstance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/camunda-case-instances")
    public ResponseEntity<CamundaCaseInstance> createCamundaCaseInstance(@RequestBody CamundaCaseInstance camundaCaseInstance) throws URISyntaxException {
        log.debug("REST request to save CamundaCaseInstance : {}", camundaCaseInstance);
        if (camundaCaseInstance.getId() != null) {
            throw new BadRequestAlertException("A new camundaCaseInstance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CamundaCaseInstance result = camundaCaseInstanceService.save(camundaCaseInstance);
        return ResponseEntity.created(new URI("/api/camunda-case-instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /camunda-case-instances : Updates an existing camundaCaseInstance.
     *
     * @param camundaCaseInstance the camundaCaseInstance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated camundaCaseInstance,
     * or with status 400 (Bad Request) if the camundaCaseInstance is not valid,
     * or with status 500 (Internal Server Error) if the camundaCaseInstance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/camunda-case-instances")
    public ResponseEntity<CamundaCaseInstance> updateCamundaCaseInstance(@RequestBody CamundaCaseInstance camundaCaseInstance) throws URISyntaxException {
        log.debug("REST request to update CamundaCaseInstance : {}", camundaCaseInstance);
        if (camundaCaseInstance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CamundaCaseInstance result = camundaCaseInstanceService.save(camundaCaseInstance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, camundaCaseInstance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /camunda-case-instances : get all the camundaCaseInstances.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of camundaCaseInstances in body
     */
    @GetMapping("/camunda-case-instances")
    public List<CamundaCaseInstance> getAllCamundaCaseInstances(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CamundaCaseInstances");
        return camundaCaseInstanceService.findAll();
    }

    /**
     * GET  /camunda-case-instances/:id : get the "id" camundaCaseInstance.
     *
     * @param id the id of the camundaCaseInstance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the camundaCaseInstance, or with status 404 (Not Found)
     */
    @GetMapping("/camunda-case-instances/{id}")
    public ResponseEntity<CamundaCaseInstance> getCamundaCaseInstance(@PathVariable Long id) {
        log.debug("REST request to get CamundaCaseInstance : {}", id);
        Optional<CamundaCaseInstance> camundaCaseInstance = camundaCaseInstanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(camundaCaseInstance);
    }

    /**
     * DELETE  /camunda-case-instances/:id : delete the "id" camundaCaseInstance.
     *
     * @param id the id of the camundaCaseInstance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/camunda-case-instances/{id}")
    public ResponseEntity<Void> deleteCamundaCaseInstance(@PathVariable Long id) {
        log.debug("REST request to delete CamundaCaseInstance : {}", id);
        camundaCaseInstanceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
