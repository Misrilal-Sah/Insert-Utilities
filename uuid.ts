import * as crypto from 'crypto';

/**
 * Generates a standard UUID v4 string in lowercase with dashes.
 * Uses Node.js built-in `crypto.randomUUID()` for cryptographic randomness.
 *
 * Example output: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generates a UUID v4 and returns it in UPPERCASE.
 *
 * Example output: "F47AC10B-58CC-4372-A567-0E02B2C3D479"
 */
export function generateUUIDUppercase(): string {
  return generateUUID().toUpperCase();
}

/**
 * Generates a UUID v4 with all dashes removed.
 *
 * Example output: "f47ac10b58cc4372a5670e02b2c3d479"
 */
export function generateUUIDNoDashes(): string {
  return generateUUID().replace(/-/g, '');
}

/**
 * Generates multiple UUID v4 strings, each on its own line.
 *
 * @param count - The number of UUIDs to generate (should be 1–100)
 * @returns A newline-separated string of UUIDs
 */
export function generateMultipleUUIDs(count: number): string {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    uuids.push(generateUUID());
  }
  return uuids.join('\n');
}
