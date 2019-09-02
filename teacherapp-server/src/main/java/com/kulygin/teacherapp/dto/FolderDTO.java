package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.Folder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;
import static org.hibernate.validator.internal.util.CollectionHelper.newArrayList;

@Getter
@Setter
public class FolderDTO {
    private Integer id;
    private String name;
    private List<FileDTO> files;

    public FolderDTO() {
    }

    public FolderDTO(Folder folder) {
        if (folder == null) {
            return;
        }
        this.id = folder.getId();
        this.name = folder.getName();
        this.files = ofNullable(folder.getFiles()).orElse(newArrayList()).stream()
                .map(FileDTO::new)
                .collect(Collectors.toList());
    }
}
