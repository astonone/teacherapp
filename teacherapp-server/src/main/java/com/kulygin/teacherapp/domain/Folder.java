package com.kulygin.teacherapp.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "public")
@EqualsAndHashCode(of = {"id"})
@ToString(exclude = {"files"})
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    @OneToMany(mappedBy="folder", fetch = FetchType.LAZY)
    private List<File> files;
}
