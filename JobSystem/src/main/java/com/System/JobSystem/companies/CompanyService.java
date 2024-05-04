package com.System.JobSystem.companies;

import java.util.List;

import org.springframework.http.HttpStatus;

public interface CompanyService {
  List<Company> findAll();
  HttpStatus updateCompany(Long id, Company company);
  HttpStatus addCompany(Company company);
  HttpStatus deleteCompany(Long id);
  Company getCompany(Long id);
}
