package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.security.auth.Subject;
import java.security.Principal;

@Getter
@Setter
public class UserDTO implements Principal {

    private Long id;
    private String email;
    private String password;
    private String newPassword;
    private UserDetailsDTO userDetails;

    public UserDTO() {
    }

    public UserDTO(User dbModel) {

        if (dbModel == null) {
            return;
        }

        this.id = dbModel.getId();
        this.email = dbModel.getEmail();
        this.password = dbModel.getPassword();
        this.userDetails = new UserDetailsDTO(dbModel.getUserDetails());
    }

    @Override
    public String getName() {
        return this.email;
    }

    @Override
    public boolean implies(Subject subject) {
        return true;
    }
}
