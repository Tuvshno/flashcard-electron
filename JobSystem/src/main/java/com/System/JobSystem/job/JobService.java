package com.System.JobSystem.job;

import java.util.List;

import org.springframework.http.HttpStatus;

public interface JobService {
  List<Job> findAll();
  void createJob(Job job);
  Job getJobById(Long id);
  HttpStatus deleteJob(Long id);
  HttpStatus updateJob(Long id, Job job);
}
