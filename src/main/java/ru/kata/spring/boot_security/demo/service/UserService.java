package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    @PersistenceContext
    private EntityManager em;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
//    @Autowired
//    BCryptPasswordEncoder bCryptPasswordEncoder;

//    public void createEntities(){
//        Role adminRole = new Role(1L, "ADMIN");
//        Role userRole = new Role(2L, "USER");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        Set<Role> adminRoles = new HashSet<>();
//        adminRoles.add(adminRole);
//
//        User user = new User();
//        user.setUsername("user");
//        user.setPassword("user");
//        user.setRoles(userRoles);
//        User admin = new User();
//        admin.setUsername("admin");
//        admin.setPassword("admin");
//        admin.setRoles(adminRoles);
//        roleRepository.save(userRole);
//        roleRepository.save(adminRole);
//        userRepository.save(admin);
//        userRepository.save(user);
//    }

    public User getCurrentUser(){
        return (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user1 = userRepository.findByUsername(username);


        if (user1 == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user1;
    }

    public User findUserById(Long userId) {
        Optional<User> userFromDb = userRepository.findById(userId);
        return userFromDb.orElse(new User());
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public boolean saveUser(User user) {
        User userFromDB = userRepository.findByUsername(user.getUsername());

        if (userFromDB != null) {
            return false;
        }

        user.setRoles(Collections.singleton(new Role(1L, "ROLE_USER")));
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public List<User> usergtList(Long idMin) {
        return em.createQuery("SELECT u FROM User u WHERE u.id > :paramId", User.class)
                .setParameter("paramId", idMin).getResultList();
    }
}

