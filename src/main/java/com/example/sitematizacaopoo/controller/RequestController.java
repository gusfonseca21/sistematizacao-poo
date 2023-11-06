package com.example.sitematizacaopoo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sitematizacaopoo.complaint.Complaint;
import com.example.sitematizacaopoo.complaint.ComplaintRepository;
import com.example.sitematizacaopoo.complaint.ComplaintRequestDTO;
import com.example.sitematizacaopoo.complaint.ComplaintResponseDTO;

@RestController
@RequestMapping("complaint")
public class RequestController {

    @Autowired
    private ComplaintRepository repository;

    @GetMapping
    public List<ComplaintResponseDTO> getAll() {
        List<ComplaintResponseDTO> complaintList = repository.findAll().stream().map(ComplaintResponseDTO::new)
                .collect(Collectors.toList());
        ;
        return complaintList;
    }

    @PostMapping
    public void saveComplaint(@RequestBody ComplaintRequestDTO data) {
        Complaint complaintData = new Complaint(data);
        repository.save(complaintData);
    }
}