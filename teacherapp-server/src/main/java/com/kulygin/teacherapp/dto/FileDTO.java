package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.File;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDTO {
    private Integer id;
    private String filename;

    public FileDTO() {
    }

    public FileDTO(File file) {
        if (file == null) {
            return;
        }
        this.id = file.getId();
        this.filename = file.getFilename();
    }
}
