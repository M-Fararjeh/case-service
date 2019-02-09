package com.edigitpath.caze.web.rest;
import com.edigitpath.caze.domain.CazeType;
import com.edigitpath.caze.service.CazeTypeService;
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
 * REST controller for managing CazeType.
 */
@RestController
@RequestMapping("/api")
public class CazeTypeResource {

    private final Logger log = LoggerFactory.getLogger(CazeTypeResource.class);

    private static final String ENTITY_NAME = "cazeType";

    private final CazeTypeService cazeTypeService;

    public CazeTypeResource(CazeTypeService cazeTypeService) {
        this.cazeTypeService = cazeTypeService;
    }

    /**
     * POST  /caze-types : Create a new cazeType.
     *
     * @param cazeType the cazeType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cazeType, or with status 400 (Bad Request) if the cazeType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/caze-types")
    public ResponseEntity<CazeType> createCazeType(@RequestBody CazeType cazeType) throws URISyntaxException {
        log.debug("REST request to save CazeType : {}", cazeType);
        if (cazeType.getId() != null) {
            throw new BadRequestAlertException("A new cazeType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CazeType result = cazeTypeService.save(cazeType);
        return ResponseEntity.created(new URI("/api/caze-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /caze-types : Updates an existing cazeType.
     *
     * @param cazeType the cazeType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cazeType,
     * or with status 400 (Bad Request) if the cazeType is not valid,
     * or with status 500 (Internal Server Error) if the cazeType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/caze-types")
    public ResponseEntity<CazeType> updateCazeType(@RequestBody CazeType cazeType) throws URISyntaxException {
        log.debug("REST request to update CazeType : {}", cazeType);
        if (cazeType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CazeType result = cazeTypeService.save(cazeType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cazeType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /caze-types : get all the cazeTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cazeTypes in body
     */
    @GetMapping("/caze-types")
    public List<CazeType> getAllCazeTypes() {
        log.debug("REST request to get all CazeTypes");
        return cazeTypeService.findAll();
    }

    /**
     * GET  /caze-types/:id : get the "id" cazeType.
     *
     * @param id the id of the cazeType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cazeType, or with status 404 (Not Found)
     */
    @GetMapping("/caze-types/{id}")
    public ResponseEntity<CazeType> getCazeType(@PathVariable Long id) {
        log.debug("REST request to get CazeType : {}", id);
        Optional<CazeType> cazeType = cazeTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cazeType);
    }

    /**
     * DELETE  /caze-types/:id : delete the "id" cazeType.
     *
     * @param id the id of the cazeType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/caze-types/{id}")
    public ResponseEntity<Void> deleteCazeType(@PathVariable Long id) {
        log.debug("REST request to delete CazeType : {}", id);
        cazeTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
