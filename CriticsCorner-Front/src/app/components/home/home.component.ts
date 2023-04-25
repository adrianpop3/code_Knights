import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from 'app/classes/movie';
import { MovieService } from 'app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
      this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchMovies(key: string): void {
    const results: Movie[] = [];

    for (const movie of this.movies) {
      if (movie.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || movie.category.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(movie);
      }
    }
    this.movies = results;
    if(results.length === 0 || !key) {
      this.getMovies();
    }
  }

  public onOpenModal(movie: Movie, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    switch(mode) {
      case 'add': {
        button.setAttribute('data-target', '#addMovieModal');
        break;
      }
      case 'edit': {
        button.setAttribute('data-target', '#editMovieModal');
        break;
      }
      case 'delete': {
        button.setAttribute('data-target', '#deleteMovieModal');
        break;
      }
    }

    container?.appendChild(button);
    button.click();
  }
}
