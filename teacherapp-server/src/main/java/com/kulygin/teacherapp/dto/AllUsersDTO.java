package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;
import static org.hibernate.validator.internal.util.CollectionHelper.newArrayList;

@Getter
@Setter
public class AllUsersDTO {
    private List<UserDTO> users;

    public AllUsersDTO() {
    }

    public AllUsersDTO(Collection<User> dbModel) {
        if (dbModel == null) {
            return;
        }
        this.users = ofNullable(dbModel).orElse(newArrayList()).stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }
}
