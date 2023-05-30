package criticscorner.back.criticscorner.controllers;

import criticscorner.back.criticscorner.models.Movie;
import criticscorner.back.criticscorner.models.Review;
import criticscorner.back.criticscorner.models.User;
import criticscorner.back.criticscorner.repositories.MovieRepository;
import criticscorner.back.criticscorner.repositories.UserRepository;
import criticscorner.back.criticscorner.services.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

    UserRepository userRepository;
    MovieRepository movieRepository;

    MovieService movieService;

    public ReviewController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movie/find/{id}/postreview")
    public ResponseEntity<Review> postReview(@RequestBody Review reviewData) {
        User user = userRepository.findByUsername(reviewData.getReviewer().getUsername());

        Movie movie = movieRepository.findMovieById(reviewData.getMovie().getId()).orElse(null);
        Review review = new Review();

        if (movie != null) {
            review.setReviewer(user);
            review.setText(reviewData.getText());

            movie.setReview(review);
            movieRepository.save(movie);
        }
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @GetMapping("/movie/find/{id}/deletereview")
    public ResponseEntity<?> deleteReview(@RequestBody Review reviewData) {
        Movie movie = movieRepository.findMovieById(reviewData.getMovie().getId()).orElse(null);

        if (movie != null) {
            for (int i = 0; i < movie.getReviews().size(); i++) {
                if (movie.getReviews().get(i).getId().equals(reviewData.getId())) {
                    movie.getReviews().remove(i);
                    break;
                }
            }

            movieRepository.save(movie);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
