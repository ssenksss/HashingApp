package com.example.hashingapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.hashingapp")
public class HashingAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(HashingAppApplication.class, args);
    }
}
