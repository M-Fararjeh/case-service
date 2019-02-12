package com.edigitpath.caze.web.rest.caze;


import com.edigitpath.caze.service.business.CaseBusService;
import com.edigitpath.caze.web.rest.errors.BadRequestAlertException;
import com.edigitpath.caze.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class CazeResource {

    private final Logger log = LoggerFactory.getLogger(CazeResource.class);

    @Autowired
    private CaseBusService caseBusService;

    @PostMapping("/case")
    public ResponseEntity<String> createCazeInstance(@RequestBody CazeDto cazeDto) throws URISyntaxException {
        log.debug("REST request to create case : {}", cazeDto);
        if (cazeDto == null) {
            throw new BadRequestAlertException("A new cazeInstance cannot already have an ID", "case", "idexists");
        }

        String result = caseBusService.create(cazeDto);
        return ResponseEntity.created(new URI("/api/case/" + result))
            .headers(HeaderUtil.createEntityCreationAlert("case", result))
            .body(result);
    }
}
