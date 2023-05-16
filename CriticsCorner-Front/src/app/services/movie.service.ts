import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'app/classes/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public baseUrl="http://localhost:8081/home";

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/all`);
  }

  public getMovie(movie: Movie): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movie.id}`);
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/add`, movie);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/update`, movie);
  }

  public deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${movieId}`);
  }
}
