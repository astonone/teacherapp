package com.kulygin.teacherapp.enumeration;

public enum ApplicationErrorTypes {
    USER_ID_NOT_FOUND(1, "User with this id has not found"),
    USER_HAS_EXISTS(2, "This user already exists"),
    IO_ERROR(3, "IO error via file download"),
    PASSWORDS_DONT_MATCH(4, "Passwords don't match"),
    INCORRECT_REGISTRATION_KEY(5, "Registration key is incorrect"),
    FOLDER_ID_NOT_FOUND(6,"Folder with this id has not found"),
    FIE_ALREADY_EXISTS(7,"File already exists");

    private String message;
    private int code;

    ApplicationErrorTypes(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
