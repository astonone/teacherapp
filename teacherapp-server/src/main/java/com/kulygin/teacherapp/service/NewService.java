package com.kulygin.teacherapp.service;

import com.kulygin.teacherapp.domain.New;

import java.util.List;

public interface NewService {
    List<New> list();

    void deleteNewById(Long id);

    New createNew(New userNew);
}
