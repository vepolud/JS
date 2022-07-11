package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping(value = "/rest")
public class RestAdminController {
    private final UserServiceImpl userService;

    @Autowired
    public RestAdminController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser() {
        return new ResponseEntity<>(userService.getCurrentUser(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> userDetails() {
        return new ResponseEntity<>(userService.allUsers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> userInfo(@PathVariable Long id) {
//
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}