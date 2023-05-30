package criticscorner.back.criticscorner.services;

import criticscorner.back.criticscorner.exceptions.MovieNotFoundException;
import criticscorner.back.criticscorner.models.Movie;
import criticscorner.back.criticscorner.repositories.MovieRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie addMovie (Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie findMovieById(Long id) {
        return movieRepository.findMovieById(id).orElseThrow(
                () -> new MovieNotFoundException("Movie with id " + id +" was not found."));
    }

    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

    public Movie updateMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Transactional
    public void deleteMovie(Long id) {
        movieRepository.deleteMovieById(id);
    }
}
