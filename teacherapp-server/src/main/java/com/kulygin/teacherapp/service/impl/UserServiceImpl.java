package com.kulygin.teacherapp.service.impl;

import com.kulygin.teacherapp.domain.User;
import com.kulygin.teacherapp.domain.UserDetails;
import com.kulygin.teacherapp.dto.UserDTO;
import com.kulygin.teacherapp.exception.UserHasExistsException;
import com.kulygin.teacherapp.exception.UserIsNotExistsException;
import com.kulygin.teacherapp.repository.UserDetailsRepository;
import com.kulygin.teacherapp.repository.UserRepository;
import com.kulygin.teacherapp.service.UserService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Log4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUserById(Long id) throws UserIsNotExistsException {
        User user = getUserById(id);
        if (user == null) {
            log.error("User has not found: " + id);
            throw new UserIsNotExistsException();
        } else {
            userRepository.deleteById(id);
        }
    }

    @Override
    public User createUser(String email, String password) throws UserHasExistsException {
        User user = findUserByEmail(email);
        if (user != null) {
            log.error("User has exist: " + email);
            throw new UserHasExistsException();
        } else {
            return userRepository.save(User.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .build());
        }
    }

    @Override
    public User addUserDetails(User user, String firstName, String lastName, String photoLink, LocalDateTime birthday) {
        UserDetails userDetails = UserDetails.builder()
                .firstName(firstName)
                .lastName(lastName)
                .photoLink(photoLink)
                .birthday(birthday)
                .build();
        userDetails = userDetailsRepository.save(userDetails);
        user.setUserDetails(userDetails);
        return userRepository.save(user);
    }

    @Override
    public User updateUserDetails(User user, String firstName, String lastName, String photoLink, LocalDateTime birthday) {
        UserDetails userDetails = user.getUserDetails();

        userDetails.setFirstName(firstName);
        userDetails.setLastName(lastName);
        userDetails.setPhotoLink(photoLink);
        userDetails.setBirthday(birthday);

        userDetails = userDetailsRepository.save(userDetails);
        user.setUserDetails(userDetails);
        return userRepository.save(user);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User uploadPhoto(User user, String fileName) {
        UserDetails userDetails = user.getUserDetails();
        userDetails.setPhotoLink(fileName);
        return userRepository.save(user);
    }

    @Override
    public int countAll() {
        return userRepository.countAll();
    }

    @Override
    public User updateUser(UserDTO userDTO) {
        if (userDTO.getEmail().equals("") || userDTO.getPassword().equals("") || userDTO.getNewPassword().equals("")) {
            return null;
        }
        User user = getUserById(userDTO.getId());
        if (user != null) {
            if (passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                user.setEmail(userDTO.getEmail());
                user.setPassword(passwordEncoder.encode(userDTO.getNewPassword()));

                user = userRepository.save(user);
            } else {
                user = null;
            }
        }
        return user;
    }

    @Override
    public User deletePhoto(User user) {
        UserDetails userDetails = user.getUserDetails();
        userDetails.setPhotoLink(null);
        return userRepository.save(user);
    }
}
