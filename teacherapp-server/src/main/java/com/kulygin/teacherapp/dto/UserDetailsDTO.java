package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.UserDetails;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String photoLink;
    private String key;
    private DateDTO birthday;

    public UserDetailsDTO() {
    }

    public UserDetailsDTO(UserDetails userDetails) {
        if (userDetails == null) {
            return;
        }
        this.id = userDetails.getId();
        this.firstName = userDetails.getFirstName();
        this.lastName = userDetails.getLastName();
        this.photoLink = userDetails.getPhotoLink();
        this.key = userDetails.getKey();
        this.birthday = new DateDTO(userDetails.getBirthday());
    }
}
