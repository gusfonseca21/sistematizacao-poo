package com.example.sitematizacaopoo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sitematizacaopoo.complaint.Complaint;
import com.example.sitematizacaopoo.complaint.ComplaintRepository;
import com.example.sitematizacaopoo.complaint.ComplaintRequestDTO;
// import com.example.sitematizacaopoo.complaint.ComplaintResponseDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("complaint")
public class RequestController {

    private final ResponseEntity<Object> INTERNAL_ERROR_RESPONSE = ResponseBody(HttpStatus.INTERNAL_SERVER_ERROR,
            "Houve um erro inesperado do servidor", null);

    @Autowired
    private ComplaintRepository repository;

    @GetMapping
    public ResponseEntity<Object> getAllComplaints() {
        try {
            List<Complaint> complaintList = repository.findAll();
            return ResponseBody(HttpStatus.OK, "Usuários retornados com sucesso", complaintList);
        } catch (Exception err) {
            return INTERNAL_ERROR_RESPONSE;
        }
    }

    @GetMapping("/{code}")
    public ResponseEntity<Object> getComplaintByCode(@PathVariable String code) {
        try {
            Optional<Complaint> complaint = repository.findByCode(code);
            if (complaint.isPresent()) {
                return ResponseBody(HttpStatus.OK, "Usuário retornado com sucesso", complaint.get());
            } else {
                return ResponseBody(HttpStatus.NOT_FOUND, "Essa reclamação não existe", null);
            }
        } catch (Exception err) {
            return INTERNAL_ERROR_RESPONSE;
        }
    }

    @PostMapping
    public ResponseEntity<Object> saveComplaint(@RequestBody ComplaintRequestDTO data) {
        if (isReqValid(data)) {
            try {
                Complaint complaint = new Complaint(data);
                repository.save(complaint);
                return ResponseBody(HttpStatus.CREATED, "Reclamação registrada com sucesso", null);
            } catch (Exception err) {
                return INTERNAL_ERROR_RESPONSE;
            }
        } else {
            return ResponseBody(HttpStatus.BAD_REQUEST, "Os campos não foram preenchidos corretamete", null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateComplaint(@RequestBody ComplaintRequestDTO data, @PathVariable int id) {
        if (isReqValid(data)) {
            try {
                Optional<Complaint> outdatedComplaint = repository.findById(id);
                if (outdatedComplaint.isPresent()) {
                    Complaint updatedComplaint = outdatedComplaint.get();
                    updatedComplaint.setName(data.name());
                    updatedComplaint.setPhone(data.phone());
                    updatedComplaint.setDescription(data.description());
                    updatedComplaint.setSolution(data.solution());
                    repository.save(updatedComplaint);
                    return ResponseBody(HttpStatus.OK, "Atualização realizada com sucesso", updatedComplaint);
                } else {
                    return ResponseBody(HttpStatus.NOT_FOUND, "Essa reclamação não existe", null);
                }
            } catch (Exception err) {
                return INTERNAL_ERROR_RESPONSE;
            }
        } else {
            return ResponseBody(HttpStatus.BAD_REQUEST, "Os campos não foram preenchidos corretamete", null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComplaintById(@PathVariable int id) {
        try {
            Optional<Complaint> complaint = repository.findById(id);
            if (complaint.isPresent()) {
                repository.deleteById(id);
                return ResponseBody(HttpStatus.OK, "Reclamação excluída com sucesso", null);
            } else {
                return ResponseBody(HttpStatus.NOT_FOUND, "Essa reclamação não existe", null);
            }
        } catch (Exception err) {
            return INTERNAL_ERROR_RESPONSE;
        }
    }

    private static ResponseEntity<Object> ResponseBody(HttpStatus status, String message, Object data) {
        Map<String, Object> jsonResponse = new HashMap<String, Object>();
        jsonResponse.put("data", data);
        jsonResponse.put("message", message);
        jsonResponse.put("status", status.value());
        return new ResponseEntity<Object>(jsonResponse, status);
    }

    private static boolean isReqValid(ComplaintRequestDTO data) {
        if (data == null || data.name() == null || data.phone() == null || data.description() == null)
            return false;
        else
            return true;
    }
}