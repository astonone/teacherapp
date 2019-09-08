package com.kulygin.teacherapp.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "public")
@EqualsAndHashCode(of = {"id"})
@ToString(exclude = {"user"})
public class New {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String text;
    private LocalDateTime created;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
