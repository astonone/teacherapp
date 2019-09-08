package com.kulygin.teacherapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/heroku")
public class HerokuHackController {

    @RequestMapping(value = "/check", method = RequestMethod.GET)
    public ResponseEntity<?> getFolders() {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
