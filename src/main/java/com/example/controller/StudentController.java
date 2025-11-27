package com.example.controller;

import com.example.dto.StudentRequest;
import com.example.entity.Student;
import com.example.repository.StudentRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
@Tag(name = "Student API", description = "Operations for managing students")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    @Operation(summary = "Get all students")
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get student by ID")
    public Student getById(@PathVariable Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student newData) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setName(newData.getName());
                    student.setEmail(newData.getEmail());
                    studentRepository.save(student);
                    return ResponseEntity.ok(student);
                })
                .orElse(ResponseEntity.notFound().build());
}


    @PostMapping
    @Operation(summary = "Add a new student")
    public ResponseEntity<Student> create(@RequestBody StudentRequest request) {
        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setUsername(request.getUsername());
        // Без Spring Security сохраняем пароль как есть
        student.setPassword(request.getPassword());
        student.setRole(request.getRole() != null ? request.getRole() : "STUDENT");

        Student saved = studentRepository.save(student);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete student by ID")
    public void delete(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}
