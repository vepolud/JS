package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class AdminController {
    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/admin")
    public String userDetails(ModelMap model) {
        model.addAttribute("usersList", userService.allUsers());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("newUser", new User());
        model.addAttribute("rolesList", userService.getAllRoles());
        return "admin";
    }

    @PostMapping(value = "/admin")
    public String addUser(@ModelAttribute("newUser") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/{id}")
    public String showUser(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userService.findUserById(id));
        return "useradmin";
    }

    @PostMapping("/admin/edit/{id}")
    public String updateUser(@ModelAttribute("editedUser") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @RequestMapping("/admin/delete/{id}")
    public String removeUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}