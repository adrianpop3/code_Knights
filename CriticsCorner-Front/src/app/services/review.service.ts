import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'app/entities/review';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class ReviewService {
    public baseUrl="http://localhost:8081/movie";

    constructor(private httpClient: HttpClient) { }

    public getReviews(): Observable<Review[]> {
        return this.httpClient.get<Review[]>(`${this.baseUrl}/all`);
    }

    public postReview(review: Review): Observable<Object>{
        return this.httpClient.post(`${this.baseUrl}`, review);
    }
}