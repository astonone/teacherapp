package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.Feedback;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackDTO {
    private Long id;
    private String userName;
    private String contactData;
    private String text;

    public FeedbackDTO(){}

    public FeedbackDTO(Feedback feedBack) {
        if (feedBack == null) {
            return;
        }
        this.id = feedBack.getId();
        this.userName = feedBack.getUserName();
        this.contactData = feedBack.getContactData();
        this.text = feedBack.getText();
    }
}
