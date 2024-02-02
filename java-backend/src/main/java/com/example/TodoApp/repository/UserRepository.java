package com.example.TodoApp.repository;

import com.example.TodoApp.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    public User findByEmailAndPassword(String email, String password);

    @Modifying
    @Transactional
    @Query(value = "delete from user where id = :id",nativeQuery = true)
    public void deleteUser(String id);

    @Query(value = "select * from user where email = :email",nativeQuery = true)
    public List<User> checkUser(String email);

    @Query(value="select * from user where email = :email and password = :password",nativeQuery = true)
    public User getByEmailAndPassword(String email, String password);
}
