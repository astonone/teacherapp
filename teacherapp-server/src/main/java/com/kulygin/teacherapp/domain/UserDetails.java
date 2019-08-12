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
@EqualsAndHashCode(of = { "id"})
@ToString(exclude = {"user"})
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    private String photoLink;
    private LocalDateTime birthday;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "userDetails", optional = false)
    private User user;
}
