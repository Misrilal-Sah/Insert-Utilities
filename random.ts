import * as crypto from 'crypto';

/**
 * Random string generation utilities.
 * Uses Node.js built-in `crypto.randomBytes()` for cryptographic randomness.
 * No Math.random() is used anywhere in this file.
 */

/** Available character sets for random string generation */
const CHARSETS: Record<string, string> = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  alphabetic:   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  numeric:      '0123456789',
  hex:          '0123456789abcdef'
};

/**
 * Generates a cryptographically secure random string using the specified charset.
 *
 * The algorithm uses `crypto.randomBytes()` to generate raw random bytes,
 * then maps each byte to a character in the charset using modulo reduction.
 * To avoid modulo bias, bytes that would cause uneven distribution are discarded
 * (rejection sampling).
 *
 * @param length  - The desired character length of the output string
 * @param charset - One of: "alphanumeric", "alphabetic", "numeric", "hex"
 *                  Falls back to "alphanumeric" if the key is not recognized.
 * @returns A random string of the specified length
 */
export function generateRandomString(length: number, charset: string): string {
  const chars = CHARSETS[charset] ?? CHARSETS['alphanumeric'];
  const charsLen = chars.length;

  // Calculate the largest value that avoids modulo bias:
  // We discard bytes that are >= (256 - 256 % charsLen) to ensure
  // each character is equally likely.
  const maxUnbiasedByte = 256 - (256 % charsLen);

  const result: string[] = [];

  // Request extra bytes up front to reduce the number of crypto.randomBytes calls.
  // In the worst case we may discard some bytes, so we over-allocate by 20%.
  let bytesNeeded = Math.ceil(length * 1.2);

  while (result.length < length) {
    const bytes = crypto.randomBytes(bytesNeeded);
    for (let i = 0; i < bytes.length && result.length < length; i++) {
      const byte = bytes[i];
      // Skip bytes that would cause bias
      if (byte < maxUnbiasedByte) {
        result.push(chars[byte % charsLen]);
      }
    }
    // If we still need more characters, request additional bytes
    bytesNeeded = Math.ceil((length - result.length) * 1.5);
  }

  return result.join('');
}

/**
 * Generates a cryptographically secure random numeric string.
 * Useful for generating PIN codes, OTPs, or identifiers.
 *
 * Note: The result is returned as a string to preserve any leading zeros.
 *
 * @param length - The number of digits
 * @returns A numeric string of exactly `length` digits
 */
export function generateRandomNumber(length: number): string {
  return generateRandomString(length, 'numeric');
}
