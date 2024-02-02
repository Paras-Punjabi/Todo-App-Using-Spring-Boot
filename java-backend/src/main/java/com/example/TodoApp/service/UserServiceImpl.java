package com.example.TodoApp.service;

import com.example.TodoApp.model.User;
import com.example.TodoApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepo;

    @Override
    public User saveUser(User user) {
        System.out.println(user);
        return userRepo.save(user);
    }

    @Override
    public User getUser(String email,String password){
        return userRepo.getByEmailAndPassword(email,password);
    }

    @Override
    public void deleteUser(String id){
        userRepo.deleteUser(id);
    }

    @Override
    public List<User> checkUser(String email){
        return userRepo.checkUser(email);
    }
}
