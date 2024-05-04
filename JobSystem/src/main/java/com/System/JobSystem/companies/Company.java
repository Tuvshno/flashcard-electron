package com.System.JobSystem.companies;

import java.util.List;

import com.System.JobSystem.job.Job;
import com.System.JobSystem.reviews.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String numOfEmployees;

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade=CascadeType.ALL)
    private List<Job> jobs;

    @OneToMany(mappedBy = "company", cascade=CascadeType.ALL)
    private List<Review> reviews;

    public Company() {
    }

    public Company(Long id, String name, String numOfEmployees, List<Job> jobs) {
        this.id = id;
        this.name = name;
        this.numOfEmployees = numOfEmployees;
        this.jobs = jobs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumOfEmployees() {
        return numOfEmployees;
    }

    public void setNumOfEmployees(String numOfEmployees) {
        this.numOfEmployees = numOfEmployees;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

}
