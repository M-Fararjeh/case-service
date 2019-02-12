package com.edigitpath.caze.web.rest.caze;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.time.LocalDate;
import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "name",
    "description",
    "issuerID",
    "caseDate"
})
public class CazeDto {

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("issuerID")
    private String issuerID;

    @JsonProperty("caseDate")
    private LocalDate caseDate;

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    public CazeDto withName(String name) {
        this.name = name;
        return this;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    public CazeDto withDescription(String description) {
        this.description = description;
        return this;
    }

    @JsonProperty("issuerID")
    public String getIssuerID() {
        return issuerID;
    }

    @JsonProperty("issuerID")
    public void setIssuerID(String issuerID) {
        this.issuerID = issuerID;
    }

    public CazeDto withIssuerID(String issuerID) {
        this.issuerID = issuerID;
        return this;
    }

    @JsonProperty("caseDate")
    public LocalDate getCaseDate() {
        return caseDate;
    }

    @JsonProperty("caseDate")
    public void setCaseDate(LocalDate caseDate) {
        this.caseDate = caseDate;
    }

    public CazeDto withCaseDate(LocalDate caseDate) {
        this.caseDate = caseDate;
        return this;
    }

}
