package com.System.JobSystem.companies.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.System.JobSystem.companies.Company;
import com.System.JobSystem.companies.CompanyRepository;
import com.System.JobSystem.companies.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {

    CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    @Override
    public HttpStatus updateCompany(Long id, Company company) {
        Optional<Company> optionalCompany = companyRepository.findById(id);
        if (optionalCompany.isPresent()) {
            Company existingCompany = optionalCompany.get();
            existingCompany.setName(company.getName());
            existingCompany.setNumOfEmployees(company.getNumOfEmployees());
            
            companyRepository.save(existingCompany);
            return HttpStatus.OK;
        }

        return HttpStatus.NOT_FOUND;
    }

    @Override
    public HttpStatus addCompany(Company company) {
        try {
            companyRepository.save(company);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.NOT_FOUND;
        }
    }

    @Override
    public HttpStatus deleteCompany(Long id) {
        try {
            companyRepository.deleteById(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.NOT_FOUND;
        }
    }

    @Override
    public Company getCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isPresent()) {
            return company.get();
        }

        return null;
    }

}
