package com.kulygin.teacherapp.domain;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "public")
@EqualsAndHashCode(of = {"id"})
@ToString(exclude = {"folder"})
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String filename;
    @ManyToOne
    @JoinColumn(name="folder_id")
    private Folder folder;
}
