package com.kulygin.teacherapp.repository;

import com.kulygin.teacherapp.domain.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
