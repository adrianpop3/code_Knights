import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'app/entities/movie';
import { Review } from 'app/entities/review';
import { ReviewService } from 'app/services/review.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit{
  
  movie: Movie | undefined;
  
  reviews: Review[] = [];

  review:Review = new Review();

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviews().subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  postReview() {
    this.reviewService.postReview(this.review)
      .subscribe(data => {
        this.router.navigate(['/postreview']);
    },  error=>alert("Sorry, review posting failed!"));
  }

  addLike(){

  }

  addDislike(){
    
  }

}
