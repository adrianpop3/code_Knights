package criticscorner.back.criticscorner.controllers;

import criticscorner.back.criticscorner.models.Movie;
import criticscorner.back.criticscorner.services.MovieService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MovieControllerTest {

    @Mock
    private MovieService movieService;

    @InjectMocks
    private MovieController movieController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddMovie() {
        // Arrange
        Movie movie = new Movie();
        movie.setTitle("Test Movie");
        when(movieService.addMovie(movie)).thenReturn(movie);

        // Act
        ResponseEntity<Movie> response = movieController.addMovie(movie);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(movie, response.getBody());
        verify(movieService, times(1)).addMovie(movie);
    }

    @Test
    public void testGetMovieById() {
        // Arrange
        Long movieId = 1L;
        Movie movie = new Movie();
        movie.setId(movieId);
        when(movieService.findMovieById(movieId)).thenReturn(movie);

        // Act
        ResponseEntity<Movie> response = movieController.getMovieById(movieId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(movie, response.getBody());
        verify(movieService, times(1)).findMovieById(movieId);
    }

    @Test
    public void testGetAllMovies() {
        // Arrange
        List<Movie> movies = new ArrayList<>();
        movies.add(new Movie());
        movies.add(new Movie());
        when(movieService.findAllMovies()).thenReturn(movies);

        // Act
        ResponseEntity<List<Movie>> response = movieController.getAllMovies();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(movies, response.getBody());
        verify(movieService, times(1)).findAllMovies();
    }

    @Test
    public void testUpdateMovie() {
        // Arrange
        Movie movie = new Movie();
        movie.setId(1L);
        when(movieService.updateMovie(movie)).thenReturn(movie);

        // Act
        ResponseEntity<Movie> response = movieController.updateMovie(movie);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(movie, response.getBody());
        verify(movieService, times(1)).updateMovie(movie);
    }

    @Test
    public void testDeleteMovie() {
        // Arrange
        Long movieId = 1L;

        // Act
        ResponseEntity<?> response = movieController.deleteMovie(movieId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(movieService, times(1)).deleteMovie(movieId);
    }
}

