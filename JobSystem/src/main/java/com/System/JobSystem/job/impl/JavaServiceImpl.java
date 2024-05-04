package com.System.JobSystem.job.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.System.JobSystem.job.Job;
import com.System.JobSystem.job.JobRepository;
import com.System.JobSystem.job.JobService;

@Service
public class JavaServiceImpl implements JobService {

    // private List<Job> jobs = new ArrayList<>();
    JobRepository jobRepository;
    private Long nextId = 1L;

    public JavaServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public List<Job> findAll() {
        return jobRepository.findAll();
    }

    @Override
    public void createJob(Job job) {
        job.setId(nextId++);
        jobRepository.save(job);

    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public HttpStatus deleteJob(Long id) {
        try {
            jobRepository.deleteById(id);
            return HttpStatus.OK;

        } catch (Exception e) {
            return HttpStatus.NOT_FOUND;
        }
    }

    @Override
    public HttpStatus updateJob(Long id, Job updatedJob) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        if (jobOptional.isPresent()) {
            Job job = jobOptional.get();
            if (updatedJob.getTitle() != null) {
                job.setTitle(updatedJob.getTitle());
            }
            if (updatedJob.getDescription() != null) { 
                job.setDescription(updatedJob.getDescription());
            }
            if (updatedJob.getMinSalary() != null) {
                job.setMinSalary(updatedJob.getMinSalary());
            }
            if (updatedJob.getMaxSalary() != null) {
                job.setMaxSalary(updatedJob.getMaxSalary());
            }
            if (updatedJob.getLocation() != null) {
                job.setLocation(updatedJob.getLocation());
            }
            if (updatedJob.getCompany() != null) {
                job.setCompany(updatedJob.getCompany());
            }
            
            jobRepository.save(job);
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;

    }
}
