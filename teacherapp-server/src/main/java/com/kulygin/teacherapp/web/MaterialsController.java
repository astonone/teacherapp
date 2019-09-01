package com.kulygin.teacherapp.web;

import com.kulygin.teacherapp.domain.File;
import com.kulygin.teacherapp.domain.Folder;
import com.kulygin.teacherapp.dto.*;
import com.kulygin.teacherapp.enumeration.ApplicationErrorTypes;
import com.kulygin.teacherapp.service.MaterialsService;
import com.kulygin.teacherapp.service.impl.yandex.YandexAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/materials")
public class MaterialsController {

    @Autowired
    private MaterialsService materialsService;
    @Autowired
    private YandexAPI yandexAPI;

    @RequestMapping(value = "/folder/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getFolder(@PathVariable("id") Integer folderId) {
        Folder folder = materialsService.getFolderById(folderId);
        if (folder == null) {
            return getErrorResponseBody(ApplicationErrorTypes.FOLDER_ID_NOT_FOUND);
        }
        return new ResponseEntity<>(convert(folder), HttpStatus.OK);
    }

    @RequestMapping(value = "/folder/list", method = RequestMethod.GET)
    public ResponseEntity<?> getFolders() {
        List<Folder> folders = materialsService.getFolders();
        return new ResponseEntity<>(convertFolderList(folders), HttpStatus.OK);
    }

    @RequestMapping(value = "/folder/create", method = RequestMethod.PUT)
    public ResponseEntity<?> createFolder(@PathParam("name") String name) {
        Folder folder = materialsService.createFolder(name);
        return new ResponseEntity<>(convert(folder), HttpStatus.OK);
    }

    @RequestMapping(value = "/folder/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteFolder(@PathVariable("id") Integer folderId) {
        Folder folder = materialsService.getFolderById(folderId);
        if (folder == null) {
            return getErrorResponseBody(ApplicationErrorTypes.FOLDER_ID_NOT_FOUND);
        }
        materialsService.deleteFolderById(folderId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "/folder/rename/{id}", method = RequestMethod.POST)
    public ResponseEntity<?> renameFolder(@PathVariable("id") Integer folderId, @PathParam("name") String name) {
        Folder folder = materialsService.getFolderById(folderId);
        if (folder == null) {
            return getErrorResponseBody(ApplicationErrorTypes.FOLDER_ID_NOT_FOUND);
        }
        folder = materialsService.renameFolder(folder, name);
        return new ResponseEntity<>(convert(folder), HttpStatus.OK);
    }

    @RequestMapping(value = "/folder/{id}/upload", method = RequestMethod.POST)
    public ResponseEntity<?> uploadCustomFileToFolder(@PathVariable("id") Integer folderId, @RequestParam("uploadedFile") MultipartFile uploadedFileRef) {
        Folder folder = materialsService.getFolderById(folderId);
        java.io.File file = null;
        if (folder == null) {
            return getErrorResponseBody(ApplicationErrorTypes.FOLDER_ID_NOT_FOUND);
        }
        try {
            file = yandexAPI.uploadFileToYandexDisk(uploadedFileRef);
            folder = materialsService.addFileToFolder(folder, file);
        } catch (FileAlreadyExistsException e) {
            return getErrorResponseBody(ApplicationErrorTypes.FIE_ALREADY_EXISTS);
        } catch (Exception e) {
            return getErrorResponseBody(ApplicationErrorTypes.IO_ERROR);
        }
        return new ResponseEntity<>(convert(folder), HttpStatus.OK);
    }

    @RequestMapping(value = "/folder/{id}/deleteFile", method = RequestMethod.POST)
    public ResponseEntity<?> deleteCustomFileFromFolder(@PathVariable("id") Integer folderId, @RequestParam("filename") String filename) {
        Folder folder = materialsService.getFolderById(folderId);
        if (folder == null) {
            return getErrorResponseBody(ApplicationErrorTypes.FOLDER_ID_NOT_FOUND);
        }
        folder = materialsService.deleteFileFromFolder(folder, filename);
        return new ResponseEntity<>(convert(folder), HttpStatus.OK);
    }

    private FileListDTO convertFileList(List<File> dbModel) {
        return (dbModel == null) ? null : new FileListDTO(dbModel);
    }

    private FolderListDTO convertFolderList(List<Folder> dbModel) {
        return (dbModel == null) ? null : new FolderListDTO(dbModel);
    }

    private FileDTO convert(File dbModel) {
        return (dbModel == null) ? null : new FileDTO(dbModel);
    }

    private FolderDTO convert(Folder dbModel) {
        return (dbModel == null) ? null : new FolderDTO(dbModel);
    }

    private ResponseEntity<ErrorResponseBody> getErrorResponseBody(ApplicationErrorTypes errorType) {
        return new ResponseEntity<>(new ErrorResponseBody(errorType), HttpStatus.NOT_FOUND);
    }
}
