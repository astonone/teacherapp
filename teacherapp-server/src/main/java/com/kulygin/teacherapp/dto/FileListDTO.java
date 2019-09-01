package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.File;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class FileListDTO {
    private List<FileDTO> files;

    public FileListDTO() {
    }

    public FileListDTO(List<File> files) {
        if (files == null) {
            return;
        }
        this.files = files.stream()
                .map(FileDTO::new)
                .collect(Collectors.toList());
    }
}
