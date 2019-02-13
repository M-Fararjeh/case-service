package com.edigitpath.caze.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.edigitpath.caze.domain.enumeration.CasePriority;

/**
 * A CazeInstance.
 */
@Entity
@Table(name = "caze_instance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CazeInstance implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "creator_id")
    private String creatorId;

    @Column(name = "issuer_id")
    private String issuerID;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "case_date")
    private LocalDate caseDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private CasePriority priority;

    @Column(name = "required_time")
    private Integer requiredTime;

    @Column(name = "secured")
    private Boolean secured;

    @Column(name = "cmmn_id")
    private String cmmnId;

    @OneToMany(mappedBy = "caseId")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CaseDataObject> caseDataObjects = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("cazeInstances")
    private CazeType cazeType;

    @ManyToMany(mappedBy = "cazeInstances")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<CamundaCaseInstance> camundaCaseInstances = new HashSet<>();

    @ManyToMany(mappedBy = "cazeInstances")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<CamundaProcessInstance> camundaProcessInstances = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "caze_instance_related_cazes",
               joinColumns = @JoinColumn(name = "caze_instance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "related_cazes_id", referencedColumnName = "id"))
    private Set<CazeInstance> relatedCazes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CazeInstance name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public CazeInstance description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNumber() {
        return number;
    }

    public CazeInstance number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public CazeInstance creatorId(String creatorId) {
        this.creatorId = creatorId;
        return this;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getIssuerID() {
        return issuerID;
    }

    public CazeInstance issuerID(String issuerID) {
        this.issuerID = issuerID;
        return this;
    }

    public void setIssuerID(String issuerID) {
        this.issuerID = issuerID;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public CazeInstance creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getCaseDate() {
        return caseDate;
    }

    public CazeInstance caseDate(LocalDate caseDate) {
        this.caseDate = caseDate;
        return this;
    }

    public void setCaseDate(LocalDate caseDate) {
        this.caseDate = caseDate;
    }

    public CasePriority getPriority() {
        return priority;
    }

    public CazeInstance priority(CasePriority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(CasePriority priority) {
        this.priority = priority;
    }

    public Integer getRequiredTime() {
        return requiredTime;
    }

    public CazeInstance requiredTime(Integer requiredTime) {
        this.requiredTime = requiredTime;
        return this;
    }

    public void setRequiredTime(Integer requiredTime) {
        this.requiredTime = requiredTime;
    }

    public Boolean isSecured() {
        return secured;
    }

    public CazeInstance secured(Boolean secured) {
        this.secured = secured;
        return this;
    }

    public void setSecured(Boolean secured) {
        this.secured = secured;
    }

    public String getCmmnId() {
        return cmmnId;
    }

    public CazeInstance cmmnId(String cmmnId) {
        this.cmmnId = cmmnId;
        return this;
    }

    public void setCmmnId(String cmmnId) {
        this.cmmnId = cmmnId;
    }

    public Set<CaseDataObject> getCaseDataObjects() {
        return caseDataObjects;
    }

    public CazeInstance caseDataObjects(Set<CaseDataObject> caseDataObjects) {
        this.caseDataObjects = caseDataObjects;
        return this;
    }

    public CazeInstance addCaseDataObject(CaseDataObject caseDataObject) {
        this.caseDataObjects.add(caseDataObject);
        caseDataObject.setCaseId(this);
        return this;
    }

    public CazeInstance removeCaseDataObject(CaseDataObject caseDataObject) {
        this.caseDataObjects.remove(caseDataObject);
        caseDataObject.setCaseId(null);
        return this;
    }

    public void setCaseDataObjects(Set<CaseDataObject> caseDataObjects) {
        this.caseDataObjects = caseDataObjects;
    }

    public CazeType getCazeType() {
        return cazeType;
    }

    public CazeInstance cazeType(CazeType cazeType) {
        this.cazeType = cazeType;
        return this;
    }

    public void setCazeType(CazeType cazeType) {
        this.cazeType = cazeType;
    }

    public Set<CamundaCaseInstance> getCamundaCaseInstances() {
        return camundaCaseInstances;
    }

    public CazeInstance camundaCaseInstances(Set<CamundaCaseInstance> camundaCaseInstances) {
        this.camundaCaseInstances = camundaCaseInstances;
        return this;
    }

    public CazeInstance addCamundaCaseInstance(CamundaCaseInstance camundaCaseInstance) {
        this.camundaCaseInstances.add(camundaCaseInstance);
        camundaCaseInstance.getCazeInstances().add(this);
        return this;
    }

    public CazeInstance removeCamundaCaseInstance(CamundaCaseInstance camundaCaseInstance) {
        this.camundaCaseInstances.remove(camundaCaseInstance);
        camundaCaseInstance.getCazeInstances().remove(this);
        return this;
    }

    public void setCamundaCaseInstances(Set<CamundaCaseInstance> camundaCaseInstances) {
        this.camundaCaseInstances = camundaCaseInstances;
    }

    public Set<CamundaProcessInstance> getCamundaProcessInstances() {
        return camundaProcessInstances;
    }

    public CazeInstance camundaProcessInstances(Set<CamundaProcessInstance> camundaProcessInstances) {
        this.camundaProcessInstances = camundaProcessInstances;
        return this;
    }

    public CazeInstance addCamundaProcessInstance(CamundaProcessInstance camundaProcessInstance) {
        this.camundaProcessInstances.add(camundaProcessInstance);
        camundaProcessInstance.getCazeInstances().add(this);
        return this;
    }

    public CazeInstance removeCamundaProcessInstance(CamundaProcessInstance camundaProcessInstance) {
        this.camundaProcessInstances.remove(camundaProcessInstance);
        camundaProcessInstance.getCazeInstances().remove(this);
        return this;
    }

    public void setCamundaProcessInstances(Set<CamundaProcessInstance> camundaProcessInstances) {
        this.camundaProcessInstances = camundaProcessInstances;
    }

    public Set<CazeInstance> getRelatedCazes() {
        return relatedCazes;
    }

    public CazeInstance relatedCazes(Set<CazeInstance> cazeInstances) {
        this.relatedCazes = cazeInstances;
        return this;
    }

    public CazeInstance addRelatedCazes(CazeInstance cazeInstance) {
        this.relatedCazes.add(cazeInstance);
        return this;
    }

    public CazeInstance removeRelatedCazes(CazeInstance cazeInstance) {
        this.relatedCazes.remove(cazeInstance);
        return this;
    }

    public void setRelatedCazes(Set<CazeInstance> cazeInstances) {
        this.relatedCazes = cazeInstances;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CazeInstance cazeInstance = (CazeInstance) o;
        if (cazeInstance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cazeInstance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CazeInstance{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", number='" + getNumber() + "'" +
            ", creatorId='" + getCreatorId() + "'" +
            ", issuerID='" + getIssuerID() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", caseDate='" + getCaseDate() + "'" +
            ", priority='" + getPriority() + "'" +
            ", requiredTime=" + getRequiredTime() +
            ", secured='" + isSecured() + "'" +
            ", cmmnId='" + getCmmnId() + "'" +
            "}";
    }
}
