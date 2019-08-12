package com.kulygin.teacherapp.repository;

import com.kulygin.teacherapp.domain.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
}
