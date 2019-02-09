package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.CamundaProcessInstance;
import com.edigitpath.caze.service.CamundaProcessInstanceService;
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
 * REST controller for managing CamundaProcessInstance.
 */
@RestController
@RequestMapping("/api")
public class CamundaProcessInstanceResource {

    private final Logger log = LoggerFactory.getLogger(CamundaProcessInstanceResource.class);

    private static final String ENTITY_NAME = "camundaProcessInstance";

    private final CamundaProcessInstanceService camundaProcessInstanceService;

    public CamundaProcessInstanceResource(CamundaProcessInstanceService camundaProcessInstanceService) {
        this.camundaProcessInstanceService = camundaProcessInstanceService;
    }

    /**
     * POST  /camunda-process-instances : Create a new camundaProcessInstance.
     *
     * @param camundaProcessInstance the camundaProcessInstance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new camundaProcessInstance, or with status 400 (Bad Request) if the camundaProcessInstance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/camunda-process-instances")
    public ResponseEntity<CamundaProcessInstance> createCamundaProcessInstance(@RequestBody CamundaProcessInstance camundaProcessInstance) throws URISyntaxException {
        log.debug("REST request to save CamundaProcessInstance : {}", camundaProcessInstance);
        if (camundaProcessInstance.getId() != null) {
            throw new BadRequestAlertException("A new camundaProcessInstance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CamundaProcessInstance result = camundaProcessInstanceService.save(camundaProcessInstance);
        return ResponseEntity.created(new URI("/api/camunda-process-instances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /camunda-process-instances : Updates an existing camundaProcessInstance.
     *
     * @param camundaProcessInstance the camundaProcessInstance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated camundaProcessInstance,
     * or with status 400 (Bad Request) if the camundaProcessInstance is not valid,
     * or with status 500 (Internal Server Error) if the camundaProcessInstance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/camunda-process-instances")
    public ResponseEntity<CamundaProcessInstance> updateCamundaProcessInstance(@RequestBody CamundaProcessInstance camundaProcessInstance) throws URISyntaxException {
        log.debug("REST request to update CamundaProcessInstance : {}", camundaProcessInstance);
        if (camundaProcessInstance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CamundaProcessInstance result = camundaProcessInstanceService.save(camundaProcessInstance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, camundaProcessInstance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /camunda-process-instances : get all the camundaProcessInstances.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of camundaProcessInstances in body
     */
    @GetMapping("/camunda-process-instances")
    public List<CamundaProcessInstance> getAllCamundaProcessInstances(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CamundaProcessInstances");
        return camundaProcessInstanceService.findAll();
    }

    /**
     * GET  /camunda-process-instances/:id : get the "id" camundaProcessInstance.
     *
     * @param id the id of the camundaProcessInstance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the camundaProcessInstance, or with status 404 (Not Found)
     */
    @GetMapping("/camunda-process-instances/{id}")
    public ResponseEntity<CamundaProcessInstance> getCamundaProcessInstance(@PathVariable Long id) {
        log.debug("REST request to get CamundaProcessInstance : {}", id);
        Optional<CamundaProcessInstance> camundaProcessInstance = camundaProcessInstanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(camundaProcessInstance);
    }

    /**
     * DELETE  /camunda-process-instances/:id : delete the "id" camundaProcessInstance.
     *
     * @param id the id of the camundaProcessInstance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/camunda-process-instances/{id}")
    public ResponseEntity<Void> deleteCamundaProcessInstance(@PathVariable Long id) {
        log.debug("REST request to delete CamundaProcessInstance : {}", id);
        camundaProcessInstanceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
