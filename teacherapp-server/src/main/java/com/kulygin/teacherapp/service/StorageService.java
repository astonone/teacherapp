package com.kulygin.teacherapp.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

public interface StorageService {

    void storeData(MultipartFile file, String fileName);

    Resource loadFile(String filename);

    void deleteAllFiles();

    void init();
}
