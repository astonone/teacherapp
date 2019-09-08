package com.kulygin.teacherapp.web;

import com.kulygin.teacherapp.domain.New;
import com.kulygin.teacherapp.dto.ErrorResponseBody;
import com.kulygin.teacherapp.dto.NewDTO;
import com.kulygin.teacherapp.dto.NewsListDTO;
import com.kulygin.teacherapp.enumeration.ApplicationErrorTypes;
import com.kulygin.teacherapp.service.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/news")
public class NewController {
    @Autowired
    private NewService newService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(convertNewsList(newService.list()), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteNewById(@PathVariable("id") Long id) {
        newService.deleteNewById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "/create", method = RequestMethod.PUT)
    public ResponseEntity<?> createNew(@RequestBody New userNew) {
        return new ResponseEntity<>(convert(newService.createNew(userNew)), HttpStatus.OK);
    }

    private NewsListDTO convertNewsList(List<New> dbModel) {
        return (dbModel == null) ? null : new NewsListDTO(dbModel);
    }

    private NewDTO convert(New dbModel) {
        return (dbModel == null) ? null : new NewDTO(dbModel);
    }

    private ResponseEntity<ErrorResponseBody> getErrorResponseBody(ApplicationErrorTypes errorType) {
        return new ResponseEntity<>(new ErrorResponseBody(errorType), HttpStatus.NOT_FOUND);
    }
}
