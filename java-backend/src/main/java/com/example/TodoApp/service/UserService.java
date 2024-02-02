package com.example.TodoApp.service;

import com.example.TodoApp.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public User getUser(String email, String password);
    public void deleteUser(String id);
    public List<User> checkUser(String email);
}
