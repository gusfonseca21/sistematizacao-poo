package com.example.sitematizacaopoo.complaint;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "complaint")
@Entity(name = "complaint")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String phone;
    private String description;
    private String code;
    private String solution;

    public Complaint(ComplaintRequestDTO data) {
        this.name = data.name();
        this.phone = data.phone();
        this.description = data.description();
        this.code = data.code();
        this.solution = data.solution();
    }
}
