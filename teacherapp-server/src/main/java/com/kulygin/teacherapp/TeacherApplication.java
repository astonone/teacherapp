package com.kulygin.teacherapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class TeacherApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(TeacherApplication.class, args);
	}
}
