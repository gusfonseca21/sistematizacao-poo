package com.example.sitematizacaopoo.complaint;

public record ComplaintResponseDTO(Integer id, String name, String phone, String description, String code,
        String solution) {
    public ComplaintResponseDTO(Complaint complaint) {
        this(complaint.getId(), complaint.getName(), complaint.getPhone(), complaint.getDescription(),
                complaint.getCode(), complaint.getSolution());
    }
}
