package com.kulygin.teacherapp.web;

import com.kulygin.teacherapp.domain.Feedback;
import com.kulygin.teacherapp.dto.ErrorResponseBody;
import com.kulygin.teacherapp.dto.FeedbackDTO;
import com.kulygin.teacherapp.dto.FeedbackListDTO;
import com.kulygin.teacherapp.enumeration.ApplicationErrorTypes;
import com.kulygin.teacherapp.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedBackService;

    @RequestMapping(value = "/create", method = RequestMethod.PUT)
    public ResponseEntity<?> createFeedBack(@RequestBody FeedbackDTO feedBackDTO) {
        return new ResponseEntity<>(convert(feedBackService.createFeedBack(feedBackDTO)), HttpStatus.OK);
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletefeedBackById(@PathVariable("id") Long id) {
        feedBackService.deleteFeedBackById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<?> getFeedBacks() {
        List<Feedback> feedbacks = feedBackService.getFeedBacks();
        return new ResponseEntity<>(convertFeedbackList(feedbacks), HttpStatus.OK);
    }

    private FeedbackListDTO convertFeedbackList(List<Feedback> dbModel) {
        return (dbModel == null) ? null : new FeedbackListDTO(dbModel);
    }
    private FeedbackDTO convert(Feedback dbModel) {
        return (dbModel == null) ? null : new FeedbackDTO(dbModel);
    }

    private ResponseEntity<ErrorResponseBody> getErrorResponseBody(ApplicationErrorTypes errorType) {
        return new ResponseEntity<>(new ErrorResponseBody(errorType), HttpStatus.NOT_FOUND);
    }
}
