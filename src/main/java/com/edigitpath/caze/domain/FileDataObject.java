package com.edigitpath.caze.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FileDataObject.
 */
@Entity
@Table(name = "file_data_object")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FileDataObject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cmis_id")
    private String cmisId;

    @Column(name = "path")
    private String path;

    @OneToOne(mappedBy = "fileDataObject")
    @JsonIgnore
    private CaseDataObject caseDataObject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCmisId() {
        return cmisId;
    }

    public FileDataObject cmisId(String cmisId) {
        this.cmisId = cmisId;
        return this;
    }

    public void setCmisId(String cmisId) {
        this.cmisId = cmisId;
    }

    public String getPath() {
        return path;
    }

    public FileDataObject path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public CaseDataObject getCaseDataObject() {
        return caseDataObject;
    }

    public FileDataObject caseDataObject(CaseDataObject caseDataObject) {
        this.caseDataObject = caseDataObject;
        return this;
    }

    public void setCaseDataObject(CaseDataObject caseDataObject) {
        this.caseDataObject = caseDataObject;
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
        FileDataObject fileDataObject = (FileDataObject) o;
        if (fileDataObject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fileDataObject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FileDataObject{" +
            "id=" + getId() +
            ", cmisId='" + getCmisId() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
