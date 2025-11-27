package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;

    // Многие Enrollment принадлежат одному Student
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Student student;

    public Enrollment() {}

    public Enrollment(String courseName, Student student) {
        this.courseName = courseName;
        this.student = student;
    }

    // getters & setters
    public Long getId() { return id; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}
