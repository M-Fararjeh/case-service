package com.edigitpath.caze.web.rest;

import com.edigitpath.caze.CaseServiceApp;

import com.edigitpath.caze.domain.CamundaProcessInstance;
import com.edigitpath.caze.repository.CamundaProcessInstanceRepository;
import com.edigitpath.caze.service.CamundaProcessInstanceService;
import com.edigitpath.caze.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.edigitpath.caze.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CamundaProcessInstanceResource REST controller.
 *
 * @see CamundaProcessInstanceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CaseServiceApp.class)
public class CamundaProcessInstanceResourceIntTest {

    private static final String DEFAULT_PROCESS_INSTANCE_ID = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_INSTANCE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PROCESS_INSTANCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_INSTANCE_NAME = "BBBBBBBBBB";

    @Autowired
    private CamundaProcessInstanceRepository camundaProcessInstanceRepository;

    @Mock
    private CamundaProcessInstanceRepository camundaProcessInstanceRepositoryMock;

    @Mock
    private CamundaProcessInstanceService camundaProcessInstanceServiceMock;

    @Autowired
    private CamundaProcessInstanceService camundaProcessInstanceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCamundaProcessInstanceMockMvc;

    private CamundaProcessInstance camundaProcessInstance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CamundaProcessInstanceResource camundaProcessInstanceResource = new CamundaProcessInstanceResource(camundaProcessInstanceService);
        this.restCamundaProcessInstanceMockMvc = MockMvcBuilders.standaloneSetup(camundaProcessInstanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CamundaProcessInstance createEntity(EntityManager em) {
        CamundaProcessInstance camundaProcessInstance = new CamundaProcessInstance()
            .processInstanceId(DEFAULT_PROCESS_INSTANCE_ID)
            .processInstanceName(DEFAULT_PROCESS_INSTANCE_NAME);
        return camundaProcessInstance;
    }

    @Before
    public void initTest() {
        camundaProcessInstance = createEntity(em);
    }

    @Test
    @Transactional
    public void createCamundaProcessInstance() throws Exception {
        int databaseSizeBeforeCreate = camundaProcessInstanceRepository.findAll().size();

        // Create the CamundaProcessInstance
        restCamundaProcessInstanceMockMvc.perform(post("/api/camunda-process-instances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camundaProcessInstance)))
            .andExpect(status().isCreated());

        // Validate the CamundaProcessInstance in the database
        List<CamundaProcessInstance> camundaProcessInstanceList = camundaProcessInstanceRepository.findAll();
        assertThat(camundaProcessInstanceList).hasSize(databaseSizeBeforeCreate + 1);
        CamundaProcessInstance testCamundaProcessInstance = camundaProcessInstanceList.get(camundaProcessInstanceList.size() - 1);
        assertThat(testCamundaProcessInstance.getProcessInstanceId()).isEqualTo(DEFAULT_PROCESS_INSTANCE_ID);
        assertThat(testCamundaProcessInstance.getProcessInstanceName()).isEqualTo(DEFAULT_PROCESS_INSTANCE_NAME);
    }

    @Test
    @Transactional
    public void createCamundaProcessInstanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = camundaProcessInstanceRepository.findAll().size();

        // Create the CamundaProcessInstance with an existing ID
        camundaProcessInstance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCamundaProcessInstanceMockMvc.perform(post("/api/camunda-process-instances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camundaProcessInstance)))
            .andExpect(status().isBadRequest());

        // Validate the CamundaProcessInstance in the database
        List<CamundaProcessInstance> camundaProcessInstanceList = camundaProcessInstanceRepository.findAll();
        assertThat(camundaProcessInstanceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCamundaProcessInstances() throws Exception {
        // Initialize the database
        camundaProcessInstanceRepository.saveAndFlush(camundaProcessInstance);

        // Get all the camundaProcessInstanceList
        restCamundaProcessInstanceMockMvc.perform(get("/api/camunda-process-instances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(camundaProcessInstance.getId().intValue())))
            .andExpect(jsonPath("$.[*].processInstanceId").value(hasItem(DEFAULT_PROCESS_INSTANCE_ID.toString())))
            .andExpect(jsonPath("$.[*].processInstanceName").value(hasItem(DEFAULT_PROCESS_INSTANCE_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCamundaProcessInstancesWithEagerRelationshipsIsEnabled() throws Exception {
        CamundaProcessInstanceResource camundaProcessInstanceResource = new CamundaProcessInstanceResource(camundaProcessInstanceServiceMock);
        when(camundaProcessInstanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCamundaProcessInstanceMockMvc = MockMvcBuilders.standaloneSetup(camundaProcessInstanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCamundaProcessInstanceMockMvc.perform(get("/api/camunda-process-instances?eagerload=true"))
        .andExpect(status().isOk());

        verify(camundaProcessInstanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCamundaProcessInstancesWithEagerRelationshipsIsNotEnabled() throws Exception {
        CamundaProcessInstanceResource camundaProcessInstanceResource = new CamundaProcessInstanceResource(camundaProcessInstanceServiceMock);
            when(camundaProcessInstanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCamundaProcessInstanceMockMvc = MockMvcBuilders.standaloneSetup(camundaProcessInstanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCamundaProcessInstanceMockMvc.perform(get("/api/camunda-process-instances?eagerload=true"))
        .andExpect(status().isOk());

            verify(camundaProcessInstanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCamundaProcessInstance() throws Exception {
        // Initialize the database
        camundaProcessInstanceRepository.saveAndFlush(camundaProcessInstance);

        // Get the camundaProcessInstance
        restCamundaProcessInstanceMockMvc.perform(get("/api/camunda-process-instances/{id}", camundaProcessInstance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(camundaProcessInstance.getId().intValue()))
            .andExpect(jsonPath("$.processInstanceId").value(DEFAULT_PROCESS_INSTANCE_ID.toString()))
            .andExpect(jsonPath("$.processInstanceName").value(DEFAULT_PROCESS_INSTANCE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCamundaProcessInstance() throws Exception {
        // Get the camundaProcessInstance
        restCamundaProcessInstanceMockMvc.perform(get("/api/camunda-process-instances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCamundaProcessInstance() throws Exception {
        // Initialize the database
        camundaProcessInstanceService.save(camundaProcessInstance);

        int databaseSizeBeforeUpdate = camundaProcessInstanceRepository.findAll().size();

        // Update the camundaProcessInstance
        CamundaProcessInstance updatedCamundaProcessInstance = camundaProcessInstanceRepository.findById(camundaProcessInstance.getId()).get();
        // Disconnect from session so that the updates on updatedCamundaProcessInstance are not directly saved in db
        em.detach(updatedCamundaProcessInstance);
        updatedCamundaProcessInstance
            .processInstanceId(UPDATED_PROCESS_INSTANCE_ID)
            .processInstanceName(UPDATED_PROCESS_INSTANCE_NAME);

        restCamundaProcessInstanceMockMvc.perform(put("/api/camunda-process-instances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCamundaProcessInstance)))
            .andExpect(status().isOk());

        // Validate the CamundaProcessInstance in the database
        List<CamundaProcessInstance> camundaProcessInstanceList = camundaProcessInstanceRepository.findAll();
        assertThat(camundaProcessInstanceList).hasSize(databaseSizeBeforeUpdate);
        CamundaProcessInstance testCamundaProcessInstance = camundaProcessInstanceList.get(camundaProcessInstanceList.size() - 1);
        assertThat(testCamundaProcessInstance.getProcessInstanceId()).isEqualTo(UPDATED_PROCESS_INSTANCE_ID);
        assertThat(testCamundaProcessInstance.getProcessInstanceName()).isEqualTo(UPDATED_PROCESS_INSTANCE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCamundaProcessInstance() throws Exception {
        int databaseSizeBeforeUpdate = camundaProcessInstanceRepository.findAll().size();

        // Create the CamundaProcessInstance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCamundaProcessInstanceMockMvc.perform(put("/api/camunda-process-instances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camundaProcessInstance)))
            .andExpect(status().isBadRequest());

        // Validate the CamundaProcessInstance in the database
        List<CamundaProcessInstance> camundaProcessInstanceList = camundaProcessInstanceRepository.findAll();
        assertThat(camundaProcessInstanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCamundaProcessInstance() throws Exception {
        // Initialize the database
        camundaProcessInstanceService.save(camundaProcessInstance);

        int databaseSizeBeforeDelete = camundaProcessInstanceRepository.findAll().size();

        // Delete the camundaProcessInstance
        restCamundaProcessInstanceMockMvc.perform(delete("/api/camunda-process-instances/{id}", camundaProcessInstance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CamundaProcessInstance> camundaProcessInstanceList = camundaProcessInstanceRepository.findAll();
        assertThat(camundaProcessInstanceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CamundaProcessInstance.class);
        CamundaProcessInstance camundaProcessInstance1 = new CamundaProcessInstance();
        camundaProcessInstance1.setId(1L);
        CamundaProcessInstance camundaProcessInstance2 = new CamundaProcessInstance();
        camundaProcessInstance2.setId(camundaProcessInstance1.getId());
        assertThat(camundaProcessInstance1).isEqualTo(camundaProcessInstance2);
        camundaProcessInstance2.setId(2L);
        assertThat(camundaProcessInstance1).isNotEqualTo(camundaProcessInstance2);
        camundaProcessInstance1.setId(null);
        assertThat(camundaProcessInstance1).isNotEqualTo(camundaProcessInstance2);
    }
}
