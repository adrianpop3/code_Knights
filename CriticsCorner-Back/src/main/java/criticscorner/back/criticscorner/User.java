package criticscorner.back.criticscorner;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Users")

public class User {

    @Id
    @Column(name = "ID")

    private String email;
    private String username;
    private String password;

}
