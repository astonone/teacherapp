package com.kulygin.teacherapp.repository;

import com.kulygin.teacherapp.domain.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
}
