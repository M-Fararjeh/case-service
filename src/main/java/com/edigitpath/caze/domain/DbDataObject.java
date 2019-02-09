package com.edigitpath.caze.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DbDataObject.
 */
@Entity
@Table(name = "db_data_object")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DbDataObject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "column_value")
    private String columnValue;

    @OneToOne(mappedBy = "dbDataObject")
    @JsonIgnore
    private CaseDataObject caseDataObject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public DbDataObject tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public DbDataObject columnName(String columnName) {
        this.columnName = columnName;
        return this;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getColumnValue() {
        return columnValue;
    }

    public DbDataObject columnValue(String columnValue) {
        this.columnValue = columnValue;
        return this;
    }

    public void setColumnValue(String columnValue) {
        this.columnValue = columnValue;
    }

    public CaseDataObject getCaseDataObject() {
        return caseDataObject;
    }

    public DbDataObject caseDataObject(CaseDataObject caseDataObject) {
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
        DbDataObject dbDataObject = (DbDataObject) o;
        if (dbDataObject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dbDataObject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DbDataObject{" +
            "id=" + getId() +
            ", tableName='" + getTableName() + "'" +
            ", columnName='" + getColumnName() + "'" +
            ", columnValue='" + getColumnValue() + "'" +
            "}";
    }
}
