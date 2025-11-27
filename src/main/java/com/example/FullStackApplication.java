package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.entity.Student;
import com.example.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FullStackApplication {
    public static void main(String[] args) {
        SpringApplication.run(FullStackApplication.class, args);
    }

    @Bean
    CommandLineRunner init(StudentRepository repo) {
        return args -> {
            if (repo.findByUsername("admin").isEmpty()) {
                Student admin = new Student();
                admin.setName("Admin User");
                admin.setEmail("admin@example.com");
                admin.setUsername("admin");
                // Security removed: store password as provided
                admin.setPassword("1234");
                admin.setRole("ADMIN");
                repo.save(admin);
                System.out.println("Admin user created: admin / 1234");
            }

            if (repo.findByUsername("student").isEmpty()) {
                Student student = new Student();
                student.setName("Student User");
                student.setEmail("student@example.com");
                student.setUsername("student");
                // Security removed: store password as provided
                student.setPassword("1234");
                student.setRole("STUDENT");
                repo.save(student);
                System.out.println("Student user created: student / 1234");
            }
        };
    }
}