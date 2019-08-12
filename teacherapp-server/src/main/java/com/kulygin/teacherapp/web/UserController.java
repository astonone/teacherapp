package com.kulygin.teacherapp.web;

import com.kulygin.teacherapp.domain.User;
import com.kulygin.teacherapp.dto.ErrorResponseBody;
import com.kulygin.teacherapp.dto.UserDTO;
import com.kulygin.teacherapp.dto.UserDetailsDTO;
import com.kulygin.teacherapp.dto.UsersDTO;
import com.kulygin.teacherapp.enumeration.ApplicationErrorTypes;
import com.kulygin.teacherapp.exception.UserHasExistsException;
import com.kulygin.teacherapp.exception.UserIsNotExistsException;
import com.kulygin.teacherapp.service.UserService;
import com.kulygin.teacherapp.service.impl.yandex.YandexAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private YandexAPI yandexAPI;

    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {
        User userByEmail = userService.findUserByEmail(user.getEmail());
        if (userByEmail != null) {
            if (passwordEncoder.matches(user.getPassword(), userByEmail.getPassword())) {
                return true;
            }
        }
        return false;
    }

    @RequestMapping("/auth")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
        String email = new String(Base64.getDecoder().decode(authToken)).split(":")[0];
        User userByEmail = userService.findUserByEmail(email);
        return convert(userByEmail);
    }

    @RequestMapping(value = "{id}/upload", method = RequestMethod.POST)
    public ResponseEntity<?> uploadToYandexDisk(@PathVariable("id") Long userId, @RequestParam("uploadedFile") MultipartFile uploadedFileRef) {
        User user = userService.getUserById(userId);
        File file = null;
        if (user == null) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_ID_NOT_FOUND);
        }
        try {
            file = yandexAPI.uploadFileToYandexDisk(uploadedFileRef);
        } catch (Exception e) {
            return getErrorResponseBody(ApplicationErrorTypes.IO_ERROR);
        }
        user = userService.uploadPhoto(user, file.getName());
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    @GetMapping("/getYandex/{filename:.+}")
    public ResponseEntity<List<String>> getFileFromYaDisk(@PathVariable String filename) {
        List<String> fileNames = Arrays.asList(MvcUriComponentsBuilder.fromMethodName(UserController.class, "getFile", filename).build().toString());
        return ResponseEntity.ok().body(fileNames);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = yandexAPI.loadFileFromYandexDisk(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @RequestMapping(value = "/{id}/deletePhoto", method = RequestMethod.POST)
    public ResponseEntity<?> deleteUserPhoto(@PathVariable("id") Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_ID_NOT_FOUND);
        }
        user = userService.deletePhoto(user);
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAccount(@PathVariable("id") Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_ID_NOT_FOUND);
        }
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    @RequestMapping(value = "email/{email}", method = RequestMethod.GET)
    public ResponseEntity<?> getAccountByEmail(@PathVariable("email") String email) {
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_ID_NOT_FOUND);
        }
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAccount(@PathVariable("id") Long userId) {
        try {
            userService.deleteUserById(userId);
        } catch (UserIsNotExistsException accountIsNotExists) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_ID_NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<?> createAccount(@RequestParam("email") String email, @RequestParam("password") String password) {
        User user;
        try {
            user = userService.createUser(email, password);
        } catch (UserHasExistsException accountHasExist) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_HAS_EXISTS);
        }
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<?> updateAccount(@RequestBody UserDTO userDTO) {
        User user = userService.updateUser(userDTO);
        if (user == null) {
            return getErrorResponseBody(ApplicationErrorTypes.PASSWORDS_DONT_MATCH);
        }
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/user_details", method = RequestMethod.PUT)
    public ResponseEntity<?> addUserDetails(@PathVariable("id") Long userId, @RequestBody UserDetailsDTO info) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return getErrorResponseBody(ApplicationErrorTypes.USER_ID_NOT_FOUND);
        }

        LocalDateTime birthday = info.getBirthday() == null ? null : info.getBirthday().getYear() == null ? null : LocalDateTime.of(info.getBirthday().getYear(), info.getBirthday().getMonth(),
                info.getBirthday().getDay(), 0, 0);
        if (user.getUserDetails() == null) {
            user = userService.addUserDetails(user, info.getFirstName(), info.getLastName(), info.getPhotoLink(), birthday);
        } else {
            user = userService.updateUserDetails(user, info.getFirstName(), info.getLastName(), info.getPhotoLink(), birthday);
        }
        return new ResponseEntity<>(convert(user), HttpStatus.OK);
    }

    private UsersDTO convertUserList(Collection<User> dbModel, Integer count) {
        return (dbModel == null) ? null : new UsersDTO(dbModel, count);
    }

    private UserDTO convert(User dbModel) {
        return (dbModel == null) ? null : new UserDTO(dbModel);
    }

    private ResponseEntity<ErrorResponseBody> getErrorResponseBody(ApplicationErrorTypes errorType) {
        return new ResponseEntity<>(new ErrorResponseBody(errorType), HttpStatus.NOT_FOUND);
    }
}
