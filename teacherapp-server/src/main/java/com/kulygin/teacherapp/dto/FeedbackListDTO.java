package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.Feedback;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class FeedbackListDTO {
    private List<FeedbackDTO> feedbacksDTO;

    public FeedbackListDTO() { }

    public FeedbackListDTO(List<Feedback> feedbacks) {
        if (feedbacks == null) {
            return;
        }
        this.feedbacksDTO = feedbacks.stream()
                .map(FeedbackDTO::new)
                .collect(Collectors.toList());
    }
}
