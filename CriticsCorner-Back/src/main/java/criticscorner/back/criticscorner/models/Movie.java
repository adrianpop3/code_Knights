package criticscorner.back.criticscorner.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Movie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String title;
    private String category;
    private Float ranking;
    private String description;
    private String imageUrl;

    @OneToMany(mappedBy = "movie")
    private List<Review> reviews;

    public void setReview(Review review) {
        reviews.add(review);
    }
}
