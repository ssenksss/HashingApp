package com.example.hashingapp.controller;

import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/hash")
public class HashController {

    @PostMapping("/sha2")
    public String hashSHA2(@RequestBody String input) {
        return hash(input, "SHA-256");
    }

    @PostMapping("/sha3")
    public String hashSHA3(@RequestBody String input) {
        return hash(input, "SHA3-256");
    }

    private String hash(String input, String algorithm) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
            byte[] hashBytes = messageDigest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            return "Greška: Algoritam nije pronađen!";
        }
    }
}
