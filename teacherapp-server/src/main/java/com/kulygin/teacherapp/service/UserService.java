package com.kulygin.teacherapp.service;

import com.kulygin.teacherapp.domain.User;
import com.kulygin.teacherapp.dto.UserDTO;
import com.kulygin.teacherapp.exception.UserHasExistsException;
import com.kulygin.teacherapp.exception.UserIsNotExistsException;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {
    User findUserByEmail(String email);

    User getUserById(Long id);

    void deleteUserById(Long id) throws UserIsNotExistsException;

    User createUser(String email, String password) throws UserHasExistsException;

    User addUserDetails(User user, String firstName, String lastName, String photoLink, LocalDateTime birthday);

    User updateUserDetails(User user, String firstName, String lastName, String photoLink, LocalDateTime birthday);

    User save(User user);

    List<User> findAll();

    User uploadPhoto(User user, String fileName);

    int countAll();

    User updateUser(UserDTO userDTO);

    User deletePhoto(User user);
}
