package com.example.TodoApp.controller;

import com.example.TodoApp.model.Task;
import com.example.TodoApp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/task")
@ CrossOrigin(origins = "*", allowedHeaders = "*")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public String add(@RequestBody Task task){
        taskService.saveTask(task);
        return "Created";
    }

    @PostMapping("/getAll")
    public List<Task> getAll(@RequestBody Map<String, String> user){
        return  taskService.findByUser(user.get("user"));
    }

    @PostMapping("/delete")
    public String deleteById(@RequestBody Map<String, String> mp){
        taskService.deleteTask(mp.get("id"));
        return "Task deleted";
    }

    @PostMapping("/update")
    public String updataDataById(@RequestBody Map<String,String> mp){
        String id = mp.get("id");
        String title = mp.get("title");
        String d =  mp.get("description");
        Integer c = Integer.parseInt(mp.get("completed"));
        LocalDate date = LocalDate.parse(mp.get("due_date"));
        System.out.println(mp);
        taskService.updateData(id,title,d,c,date);
        return "Task Updated";
    }
}
