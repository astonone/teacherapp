package com.kulygin.teacherapp.service.impl;

import com.kulygin.teacherapp.service.StorageService;
import lombok.extern.log4j.Log4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Log4j
public class StorageServiceImpl implements StorageService {
    private final Path rootLocation = Paths.get("storage");

    public void storeData(MultipartFile file, String fileName) {
        storeFile(file, fileName, this.rootLocation);
    }

    public Resource loadFile(String filename) {
        return getResource(filename, rootLocation);
    }

    public void deleteAllFiles() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            log.error("Could not initialize storage!");
            throw new RuntimeException("Could not initialize storage!");
        }
    }

    public void storeFile(MultipartFile file, String fileName, Path rootLocationPhoto) {
        try {
            if (!Files.exists(rootLocationPhoto)) {
                Files.createDirectory(rootLocationPhoto);
            }
            Files.copy(file.getInputStream(), rootLocationPhoto.resolve(fileName));
        } catch (Exception e) {
            log.error("Error via file saving: ", e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private Resource getResource(String filename, Path rootLocationPhoto) {
        try {
            Path file = rootLocationPhoto.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                log.error("Problems with resource reading");
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            log.error("Error via file loading");
            throw new RuntimeException("FAIL!");
        }
    }
}
