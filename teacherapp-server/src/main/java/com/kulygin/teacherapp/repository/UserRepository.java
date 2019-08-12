package com.kulygin.teacherapp.repository;

import com.kulygin.teacherapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findAll();
    @Query("select count(u) from User u")
    int countAll();
}
