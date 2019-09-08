package com.kulygin.teacherapp.dto;

import com.kulygin.teacherapp.domain.New;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class NewsListDTO {
    private List<NewDTO> newsDTO;

    public NewsListDTO() {
    }

    public NewsListDTO(List<New> news) {
        if (news == null) {
            return;
        }

        this.newsDTO = news.stream()
                .map(NewDTO::new)
                .collect(Collectors.toList());
    }
}
