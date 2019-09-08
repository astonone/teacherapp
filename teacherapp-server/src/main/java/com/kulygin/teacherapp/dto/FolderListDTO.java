package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.Folder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class FolderListDTO {
    private List<FolderDTO> folders;

    public FolderListDTO() {
    }

    public FolderListDTO(List<Folder> folders) {
        if (folders == null) {
            return;
        }
        this.folders = folders.stream()
                .map(FolderDTO::new)
                .collect(Collectors.toList());
    }
}
