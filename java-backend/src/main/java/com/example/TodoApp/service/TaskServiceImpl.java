package com.example.TodoApp.service;

import com.example.TodoApp.model.Task;
import com.example.TodoApp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskServiceImpl implements  TaskService{
    @Autowired
    TaskRepository taskRepo;
    @Override
    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }

    @Override
    public List<Task> findByUser(String user) {
        return taskRepo.findByUser(user);
    }

    @Override
    public void deleteTask(String id){
        taskRepo.deleteById(id);
    }

    @Override
    public void deleteAllTask(String user){
        taskRepo.deleteAllTask(user);
    }

    @Override
    public void updateData(String id, String title, String d, Integer c, LocalDate date){
        taskRepo.updateData(id,title,d,c,date);
    }
}
