import * as crypto from 'crypto';

export function aesEncrypt(value: string, seed: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', seed);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function aesDecrypt(encryptedValue: string, seed: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', seed);
    let decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}