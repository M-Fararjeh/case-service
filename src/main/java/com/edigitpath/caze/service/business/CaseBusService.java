package com.edigitpath.caze.service.business;

import com.edigitpath.caze.domain.CazeInstance;
import com.edigitpath.caze.domain.CazeType;
import com.edigitpath.caze.repository.CazeInstanceRepository;
import com.edigitpath.caze.repository.CazeTypeRepository;
import com.edigitpath.caze.service.CazeInstanceService;
import com.edigitpath.caze.service.CazeTypeService;
import com.edigitpath.caze.web.rest.caze.CazeDto;
import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.runtime.CaseInstance;
import org.camunda.bpm.engine.runtime.CaseInstanceBuilder;
import org.camunda.bpm.engine.runtime.CaseInstanceQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class CaseBusService {

    @Autowired
    private CazeInstanceService cazeInstanceService;

    @Autowired
    private CazeTypeService cazeTypeService;


    @Autowired
    private CazeInstanceRepository cazeInstanceRepository;

    @Autowired
    private CazeTypeRepository cazeTypeRepository;

    @Autowired
    private CaseService caseService;

    @Transactional
    public String create(CazeDto cazeDto){

        CazeType cazeType=cazeTypeRepository.findByName(cazeDto.getName());
        if (cazeType==null){

        }
        CazeInstance cazeInstance=new CazeInstance();

        cazeInstance.setCreationDate(LocalDate.now());
        cazeInstance.setNumber(CaseNumberGenerator.generateNumber());

        cazeInstance.setCaseDate(cazeDto.getCaseDate());
        cazeInstance.setDescription(cazeDto.getDescription());
        cazeInstance.setIssuerID(cazeDto.getIssuerID());

        cazeInstance.setCazeType(cazeType);
        cazeInstance.setSecured(cazeType.isSecured());
        cazeInstance.setRequiredTime(cazeType.getRequiredTime());
        cazeInstance.setPriority(cazeType.getPriority());
        cazeInstance.setName(cazeType.getName());

        cazeInstanceRepository.save(cazeInstance);
        CaseInstance caseInstance=  caseService.createCaseInstanceByKey("case");
        cazeInstance.setCmmnId(caseInstance.getId());
        return String.valueOf(cazeInstance.getId());
    }
}
