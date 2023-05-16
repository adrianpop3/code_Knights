package criticscorner.back.criticscorner.controllers;

import criticscorner.back.criticscorner.models.User;
import criticscorner.back.criticscorner.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegisterUser() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        when(userRepository.save(user)).thenReturn(user);

        // Act
        ResponseEntity<User> response = userController.registerUser(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testLoginUser_Success() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);

        // Act
        ResponseEntity<?> response = userController.loginUser(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userRepository, times(1)).findByUsername(user.getUsername());
    }
}

