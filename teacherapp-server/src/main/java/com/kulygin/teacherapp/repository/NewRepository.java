package com.kulygin.teacherapp.repository;

import com.kulygin.teacherapp.domain.New;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewRepository extends JpaRepository<New, Long> {
    List<New> findAllByOrderByCreatedDesc();
}
