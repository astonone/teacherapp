package com.kulygin.teacherapp.service.impl;

import com.kulygin.teacherapp.domain.New;
import com.kulygin.teacherapp.repository.NewRepository;
import com.kulygin.teacherapp.service.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewServiceImpl implements NewService {
    @Autowired
    private NewRepository newRepository;

    @Override
    public List<New> list() {
        return newRepository.findAllByOrderByCreatedDesc();
    }

    @Override
    public void deleteNewById(Long id) {
        if (newRepository.existsById(id)) {
            newRepository.deleteById(id);
        }
    }

    @Override
    public New createNew(New userNew) {
        New note = New.builder()
                .title(userNew.getTitle())
                .text(userNew.getText())
                .created(LocalDateTime.now())
                .user(userNew.getUser())
                .build();
        return newRepository.save(note);
    }
}
