package com.example.TodoApp.repository;

import com.example.TodoApp.model.Task;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    public List<Task> findByUser(String user);

    @Modifying
    @Transactional
    @Query(value = "update task set title = :title, description = :description, completed= :completed, due_date = :date where id= :id",nativeQuery = true)
    public int updateData(String id, String title, String description, int completed, LocalDate date);

    @Modifying
    @Transactional
    @Query(value = "delete from task where id = :id",nativeQuery = true)
    public void deleteById(String id);

    @Modifying
    @Transactional
    @Query(value = "delete from task where user = :user",nativeQuery = true)
    public void deleteAllTask(String user);
}
