package com.kulygin.teacherapp.service;

import com.kulygin.teacherapp.domain.Feedback;
import com.kulygin.teacherapp.dto.FeedbackDTO;

import java.util.List;

public interface FeedbackService {
    void deleteFeedBackById(Long id);
    Feedback createFeedBack(FeedbackDTO feedBackDTO);
    List<Feedback> getFeedBacks();
}
