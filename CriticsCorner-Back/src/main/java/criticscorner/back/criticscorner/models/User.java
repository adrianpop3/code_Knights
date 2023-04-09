package criticscorner.back.criticscorner.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@AllArgsConstructor
@Data
@NoArgsConstructor
public class User {

    @Id
    private Integer id;
    private String username;
    private String password;
    private String email;

}
