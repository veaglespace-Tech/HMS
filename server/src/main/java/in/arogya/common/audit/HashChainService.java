package in.arogya.common.audit;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Computes SHA-256 hashes for the audit log chain.
 * curr_hash = SHA256(prevHash + payload)
 */
@Service
public class HashChainService {

    public String computeHash(String prevHash, String payload) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String input = (prevHash == null ? "GENESIS" : prevHash) + payload;
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder hex = new StringBuilder();
        for (byte b : bytes) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }
}
