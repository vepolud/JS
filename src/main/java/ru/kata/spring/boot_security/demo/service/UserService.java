package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    User getCurrentUser();

    UserDetails loadUserByUsername(String email);

    User findUserById(Long userId);

    List<User> allUsers();

    List<Role> getAllRoles();

    void saveUser(User user);

    void updateUser(User user);

    void deleteUser(Long userId);
}
