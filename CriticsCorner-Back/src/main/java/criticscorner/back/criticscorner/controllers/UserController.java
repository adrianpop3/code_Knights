package criticscorner.back.criticscorner.controllers;

import criticscorner.back.criticscorner.models.User;
import criticscorner.back.criticscorner.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userRepository.save(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User userData) {
        User user = userRepository.findByUsername(userData.getUsername());

        if(user.getPassword().equals(userData.getPassword())) {
            String token = Jwts.builder()
                    .setSubject(user.getId().toString())
                    .signWith(Keys.hmacShaKeyFor("secret".getBytes()))
                    .compact();
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.internalServerError().build();
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String authHeader) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey("secret".getBytes())
                    .parseClaimsJws(authHeader)
                    .getBody();
            Long userId = Long.parseLong(claims.getSubject());
            User user = userRepository.findById(userId).orElse(null);
            return ResponseEntity.ok(user);
        } catch (SignatureException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
