package com.System.JobSystem.reviews;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.System.JobSystem.companies.Company;

public interface ReviewService {

    List<Review> findall(Long id);

    HttpStatus addReview(Company company, Review review);

    Review getReview(Long reviewId);

    HttpStatus updateReview(Long reviewId, Review review);

    HttpStatus deleteReview(Long reviewId);
}
