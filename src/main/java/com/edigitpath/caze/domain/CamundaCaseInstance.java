package com.edigitpath.caze.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CamundaCaseInstance.
 */
@Entity
@Table(name = "camunda_case_instance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CamundaCaseInstance implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "case_instance_id")
    private String caseInstanceId;

    @Column(name = "case_instance_name")
    private String caseInstanceName;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "camunda_case_instance_caze_instance",
               joinColumns = @JoinColumn(name = "camunda_case_instance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "caze_instance_id", referencedColumnName = "id"))
    private Set<CazeInstance> cazeInstances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaseInstanceId() {
        return caseInstanceId;
    }

    public CamundaCaseInstance caseInstanceId(String caseInstanceId) {
        this.caseInstanceId = caseInstanceId;
        return this;
    }

    public void setCaseInstanceId(String caseInstanceId) {
        this.caseInstanceId = caseInstanceId;
    }

    public String getCaseInstanceName() {
        return caseInstanceName;
    }

    public CamundaCaseInstance caseInstanceName(String caseInstanceName) {
        this.caseInstanceName = caseInstanceName;
        return this;
    }

    public void setCaseInstanceName(String caseInstanceName) {
        this.caseInstanceName = caseInstanceName;
    }

    public Set<CazeInstance> getCazeInstances() {
        return cazeInstances;
    }

    public CamundaCaseInstance cazeInstances(Set<CazeInstance> cazeInstances) {
        this.cazeInstances = cazeInstances;
        return this;
    }

    public CamundaCaseInstance addCazeInstance(CazeInstance cazeInstance) {
        this.cazeInstances.add(cazeInstance);
        cazeInstance.getCamundaCaseInstances().add(this);
        return this;
    }

    public CamundaCaseInstance removeCazeInstance(CazeInstance cazeInstance) {
        this.cazeInstances.remove(cazeInstance);
        cazeInstance.getCamundaCaseInstances().remove(this);
        return this;
    }

    public void setCazeInstances(Set<CazeInstance> cazeInstances) {
        this.cazeInstances = cazeInstances;
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
        CamundaCaseInstance camundaCaseInstance = (CamundaCaseInstance) o;
        if (camundaCaseInstance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), camundaCaseInstance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CamundaCaseInstance{" +
            "id=" + getId() +
            ", caseInstanceId='" + getCaseInstanceId() + "'" +
            ", caseInstanceName='" + getCaseInstanceName() + "'" +
            "}";
    }
}
