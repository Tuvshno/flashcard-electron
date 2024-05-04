package com.System.JobSystem.reviews;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long>{

    public List<Review> findByCompanyId(Long companyId);
  
}
