package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.New;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewDTO {
    private Long id;
    private String title;
    private String text;
    private DateDTO created;
    private UserDTO userDTO;

    public NewDTO() {
    }

    public NewDTO(New userNew) {
        if (userNew == null) {
            return;
        }

        this.id = userNew.getId();
        this.title = userNew.getTitle();
        this.text = userNew.getText();
        this.created = new DateDTO(userNew.getCreated());
        this.userDTO = new UserDTO(userNew.getUser());
    }
}
