package com.kulygin.teacherapp.service;

import com.kulygin.teacherapp.domain.Folder;

import java.io.File;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;

public interface MaterialsService {
    Folder getFolderById(Integer folderId);

    List<Folder> getFolders();

    Folder createFolder(String name);

    void deleteFolderById(Integer folderId);

    Folder renameFolder(Folder folder, String name);

    Folder addFileToFolder(Folder folder, File file) throws FileAlreadyExistsException;

    Folder deleteFileFromFolder(Folder folder, Integer fileId);
}
