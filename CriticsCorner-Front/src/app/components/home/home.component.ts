import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from 'app/classes/movie';
import { MovieService } from 'app/services/movie.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  movies: Movie[] = [];
  deleteMovie: Movie | undefined;
  editMovie: Movie | undefined;

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

  public onOpenModal(movie: Movie | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    switch(mode) {
      case 'add': {
        button.setAttribute('data-bs-target', '#addMovieModal');
        break;
      }
      case 'edit': {
        this.editMovie = movie;
        button.setAttribute('data-bs-target', '#editMovieModal');
        break;
      }
      case 'delete': {
        this.deleteMovie = movie;
        button.setAttribute('data-bs-target', '#deleteMovieModal');
        break;
      }
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddMovie(addForm: NgForm): void {
    document.getElementById('add-movie-form')?.click();
    this.movieService.addMovie(addForm.value).subscribe(
      (response) => {
        this.getMovies();
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset()
      }
    );
  }
   
  public onUpdateMovie(movie: Movie): void {
    this.movieService.updateMovie(movie).subscribe(
      (response) => {
        this.getMovies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(
      () => {
        this.getMovies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
