package com.example.TodoApp.controller;
import com.example.TodoApp.model.User;
import com.example.TodoApp.service.TaskService;
import com.example.TodoApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @PostMapping("/signup")
    public String add(@RequestBody User user){
        String email = user.getEmail();
        List<User> ans = userService.checkUser(email);
        if(ans.size() == 0){
            userService.saveUser(user);
            return "User is Added";
        }
        return "Email Already Exists";
    }

    @PostMapping("/signin")
    public User getUser(@RequestBody Map<String,String> mp){
        User u = userService.getUser(mp.get("email"),mp.get("password"));
        if(u != null) {
            return u;
        }
        return new User();
    }

    @PostMapping("/delete")
    public String deleteUser(@RequestBody Map<String,String> mp){
        userService.deleteUser(mp.get("id"));
        taskService.deleteAllTask(mp.get("id"));
        return "User Deleted and all its tasks";
    }
}
