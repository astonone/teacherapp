package com.kulygin.teacherapp.repository;

import com.kulygin.teacherapp.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Integer> {
    File findByFilename(String filename);
}
