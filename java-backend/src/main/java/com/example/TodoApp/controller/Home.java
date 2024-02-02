package com.example.TodoApp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Home {
    @GetMapping(path = {"","/"})
    public String hello(){
        return "<h1 style='text-align:center;'>Welcome to Spring Boot Backend</h1>";
    }
}
