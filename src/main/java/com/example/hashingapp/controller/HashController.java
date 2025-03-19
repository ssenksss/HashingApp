package com.example.hashingapp.controller;

import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/hash")
public class HashController {

    // Post metoda za SHA-2 hashing
    @PostMapping("/sha2")
    public String hashSHA2(@RequestBody String input) {
        return hash(input, "SHA-256"); // SHA-2 koristi SHA-256
    }

    // Post metoda za SHA-3 hashing
    @PostMapping("/sha3")
    public String hashSHA3(@RequestBody String input) {
        return hash(input, "SHA3-256"); // Pravilni naziv algoritma za SHA-3
    }

    // Pomocna metoda za hashiranje stringa
    private String hash(String input, String algorithm) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
            byte[] hashBytes = messageDigest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(Integer.toHexString(0xFF & b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "Greška u algoritmu";
        }
    }
}
