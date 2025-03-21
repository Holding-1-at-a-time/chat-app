// apps/chat-system/convex/chat.ts
import { v } from "convex/values";
import crypto from "crypto";

/**
 * The algorithm to use for encrypting messages.
 *
 * We use AES-256-CBC, which is a widely-used and secure encryption algorithm.
 */
const algorithm = "aes-256-cbc";

/**
 * The encryption key to use.
 *
 * This should be a 32-byte hexadecimal string. If it's not defined, we throw an error.
 */
const encryptionKey: string | undefined = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
    throw new Error(
        "ENCRYPTION_KEY is not defined. This is the key used to encrypt messages, and it must be a 32-byte hexadecimal string."
    );
}

/**
 * Encrypts a plaintext message using AES-256-CBC.
 *
 * This function takes a plaintext message as a string and returns the encrypted message as a string in the format "iv:ciphertext".
 *
 * @param text - The plaintext message as a string.
 * @returns The encrypted message as a string in the format "iv:ciphertext".
 */
function encryptText(text: string): string {
    // Generate a random 16-byte initialization vector.
    // This is used to ensure that two different encryptions of the same plaintext result in different ciphertexts.
    const iv: Buffer = crypto.randomBytes(16);

    // Create a cipher object using the encryption key and the initialization vector.
    const cipher: crypto.Cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(encryptionKey!, "hex"),
        iv
    );

    // Encrypt the plaintext using the cipher object.
    // We use update() to encrypt the plaintext in chunks, and final() to get the final encrypted ciphertext.
    let encrypted: string = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Return the encrypted message as a string in the format "iv:ciphertext".
    // The initialization vector is stored in the first 32 bytes of the string.
    // The ciphertext is stored in the rest of the string.
    return iv.toString("hex") + ":" + encrypted;
}

