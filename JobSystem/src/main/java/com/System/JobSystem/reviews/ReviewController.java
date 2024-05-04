package com.System.JobSystem.reviews;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.System.JobSystem.companies.Company;
import com.System.JobSystem.companies.CompanyService;

@RestController
@RequestMapping("/companies/{companyId}/reviews")
public class ReviewController {

    ReviewService reviewService;
    CompanyService companyService;

    public ReviewController(ReviewService reviewService, CompanyService companyService) {
        this.reviewService = reviewService;
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<List<Review>> findAll(@PathVariable Long companyId) {
        return ResponseEntity.ok(reviewService.findall(companyId));
    }

    @PostMapping
    public ResponseEntity<HttpStatus> addReview(@PathVariable Long companyId, @RequestBody Review review) {
        Company company = companyService.getCompany(companyId);
        HttpStatus status;
        if (company != null) {
            status = reviewService.addReview(company, review);
        } else {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(status);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReview(@PathVariable Long reviewId) {
        Review review = reviewService.getReview(reviewId);

        if (review != null) {
            return new ResponseEntity<>(review, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<HttpStatus> updateReview(@PathVariable Long companyId, Long reviewId, @RequestBody Review review) {
        return new ResponseEntity<>(reviewService.updateReview(reviewId, review));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable Long companyId, Long reviewId) {
        return new ResponseEntity<>(reviewService.deleteReview(reviewId));
    }
}
