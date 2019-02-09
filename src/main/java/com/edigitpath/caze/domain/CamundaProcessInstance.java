package com.edigitpath.caze.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CamundaProcessInstance.
 */
@Entity
@Table(name = "camunda_process_instance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CamundaProcessInstance implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "process_instance_id")
    private String processInstanceId;

    @Column(name = "process_instance_name")
    private String processInstanceName;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "camunda_process_instance_caze_instance",
               joinColumns = @JoinColumn(name = "camunda_process_instance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "caze_instance_id", referencedColumnName = "id"))
    private Set<CazeInstance> cazeInstances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public CamundaProcessInstance processInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
        return this;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public String getProcessInstanceName() {
        return processInstanceName;
    }

    public CamundaProcessInstance processInstanceName(String processInstanceName) {
        this.processInstanceName = processInstanceName;
        return this;
    }

    public void setProcessInstanceName(String processInstanceName) {
        this.processInstanceName = processInstanceName;
    }

    public Set<CazeInstance> getCazeInstances() {
        return cazeInstances;
    }

    public CamundaProcessInstance cazeInstances(Set<CazeInstance> cazeInstances) {
        this.cazeInstances = cazeInstances;
        return this;
    }

    public CamundaProcessInstance addCazeInstance(CazeInstance cazeInstance) {
        this.cazeInstances.add(cazeInstance);
        cazeInstance.getCamundaProcessInstances().add(this);
        return this;
    }

    public CamundaProcessInstance removeCazeInstance(CazeInstance cazeInstance) {
        this.cazeInstances.remove(cazeInstance);
        cazeInstance.getCamundaProcessInstances().remove(this);
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
        CamundaProcessInstance camundaProcessInstance = (CamundaProcessInstance) o;
        if (camundaProcessInstance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), camundaProcessInstance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CamundaProcessInstance{" +
            "id=" + getId() +
            ", processInstanceId='" + getProcessInstanceId() + "'" +
            ", processInstanceName='" + getProcessInstanceName() + "'" +
            "}";
    }
}
