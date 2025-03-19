package com.example.hashingapp.controller;

import org.springframework.web.bind.annotation.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.Instant;

@RestController
@RequestMapping("/api/hash")
public class HashController{


    @PostMapping("/sha2")
    public HashResponse hashSHA2(@RequestBody String input) {
        return hash(input, "SHA-256");
    }

    @PostMapping("/sha3")
    public HashResponse hashSHA3(@RequestBody String input) {
        return hash(input, "SHA3-256");
    }

    private HashResponse hash(String input, String algorithm) {
        Instant start = Instant.now();
        try {
            MessageDigest digest = MessageDigest.getInstance(algorithm);
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }

            Instant end = Instant.now();
            long duration = Duration.between(start, end).toMillis();
            return new HashResponse(hexString.toString(), duration);
        } catch (NoSuchAlgorithmException e) {
            return new HashResponse("Greška u algoritmu", 0);
        }
    }


    public static class HashResponse {
        private String hashValue;
        private long duration;

        public HashResponse(String hashValue, long duration) {
            this.hashValue = hashValue;
            this.duration = duration;
        }

        public String getHashValue() {
            return hashValue;
        }

        public long getDuration() {
            return duration;
        }
    }
}