package com.example.sitematizacaopoo.complaint;

import jakarta.persistence.*;

@Table(name = "complaint")
@Entity(name = "complaint")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String phone;
    private String description;
    private String code;
    private String solution;

    public Complaint() {

    }

    public Complaint(ComplaintRequestDTO data) {
        this.name = data.name();
        this.phone = data.phone();
        this.description = data.description();
        this.code = createCode();
        this.solution = data.solution();
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getDescription() {
        return description;
    }

    public String getCode() {
        return code;
    }

    public String getSolution() {
        return solution;
    }

    private String createCode() {
        String nowTimestamp = Long.toString(System.currentTimeMillis());
        String nowLastThreeDigits = nowTimestamp.substring(nowTimestamp.length() - 3);
        String phoneLastTwoDigits = phone.substring(phone.length() - 2);
        return phoneLastTwoDigits.concat(nowLastThreeDigits);
    }

}
