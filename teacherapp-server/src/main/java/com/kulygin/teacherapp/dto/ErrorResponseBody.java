package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.enumeration.ApplicationErrorTypes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponseBody {
    private int code;
    private String message;

    public ErrorResponseBody() {
    }

    public ErrorResponseBody(ApplicationErrorTypes message) {
        this.code = message.getCode();
        this.message = message.getMessage();
    }
}
