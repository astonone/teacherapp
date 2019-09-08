package com.kulygin.teacherapp.service.impl;

import com.kulygin.teacherapp.domain.Folder;
import com.kulygin.teacherapp.repository.FileRepository;
import com.kulygin.teacherapp.repository.FolderRepository;
import com.kulygin.teacherapp.service.MaterialsService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;

@Service
@Log4j
public class MaterialsServiceImpl implements MaterialsService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private FolderRepository folderRepository;

    @Override
    public Folder getFolderById(Integer folderId) {
        return folderRepository.findById(folderId).orElse(null);
    }

    @Override
    public List<Folder> getFolders() {
        return folderRepository.findAll();
    }

    @Override
    public Folder createFolder(String name) {
        return folderRepository.save(Folder.builder()
                .name(name)
                .build());
    }

    @Override
    public void deleteFolderById(Integer folderId) {
        folderRepository.deleteById(folderId);
    }

    @Override
    public Folder renameFolder(Folder folder, String name) {
        folder.setName(name);
        return folderRepository.save(folder);
    }

    @Override
    public Folder addFileToFolder(Folder folder, File file) throws FileAlreadyExistsException {
        if (fileRepository.findByFilename(file.getName()) != null) {
            throw new FileAlreadyExistsException("File Already exists");
        }
        com.kulygin.teacherapp.domain.File newFile = com.kulygin.teacherapp.domain.File.builder()
                .filename(file.getName())
                .folder(folder)
                .build();
        newFile = fileRepository.save(newFile);
        folder.getFiles().add(newFile);
        return folderRepository.save(folder);
    }

    @Override
    public Folder deleteFileFromFolder(Folder folder, Integer fileId) {
        com.kulygin.teacherapp.domain.File file = fileRepository.findById(fileId).orElse(null);
        if (file != null) {
            folder.getFiles().remove(file);
            file.setFolder(null);
            fileRepository.save(file);
        }
        return folder;
    }
}
