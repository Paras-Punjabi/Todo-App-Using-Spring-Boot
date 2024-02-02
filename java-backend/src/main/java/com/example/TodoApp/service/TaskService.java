package com.example.TodoApp.service;
import java.time.LocalDate;
import java.util.List;
import com.example.TodoApp.model.Task;

public interface TaskService {
    public Task saveTask(Task task);
    public List<Task> findByUser(String user);
    public void deleteTask(String id);
    public void deleteAllTask(String user);
    public void updateData(String id, String title, String des, Integer completed, LocalDate date);
}
