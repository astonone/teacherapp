package com.kulygin.teacherapp.service.impl;

import com.kulygin.teacherapp.domain.Feedback;
import com.kulygin.teacherapp.dto.FeedbackDTO;
import com.kulygin.teacherapp.repository.FeedbackRepository;
import com.kulygin.teacherapp.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepository feedBackRepository;

    @Override
    public void deleteFeedBackById(Long id) {
        Feedback feedBack = feedBackRepository.findById(id).orElse(null);;
        if (feedBack != null) {
            feedBackRepository.deleteById(id);
        }
    }

    @Override
    public Feedback createFeedBack(FeedbackDTO feedBackDTO) {
        Feedback feedBack = Feedback.builder()
                .userName(feedBackDTO.getUserName())
                .contactData(feedBackDTO.getContactData())
                .text(feedBackDTO.getText())
                .build();
        return feedBackRepository.save(feedBack);
    }

    @Override
    public List<Feedback> getFeedBacks() {
        return feedBackRepository.findAll();
    }
}
