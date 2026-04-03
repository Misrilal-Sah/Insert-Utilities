/**
 * Timestamp generation utilities.
 * No external packages — all formatting is done with vanilla JS Date methods.
 */

/** Full month names for "MMMM" format support */
const MONTH_NAMES: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Zero-pads a number to at least 2 digits.
 * e.g. 5 → "05", 12 → "12"
 */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Zero-pads a number to at least 3 digits (used for milliseconds).
 * e.g. 5 → "005", 45 → "045", 123 → "123"
 */
function pad3(n: number): string {
  return String(n).padStart(3, '0');
}

/**
 * Generates a formatted timestamp string for the current date/time.
 *
 * Supported format strings:
 *   "YYYY-MM-DD HH:mm:ss"     → "2025-04-15 14:30:45"
 *   "YYYY-MM-DDTHH:mm:ssZ"    → "2025-04-15T14:30:45.000Z"  (ISO 8601)
 *   "MM/DD/YYYY HH:mm:ss"     → "04/15/2025 14:30:45"
 *   "DD/MM/YYYY HH:mm:ss"     → "15/04/2025 14:30:45"
 *   "MMMM DD, YYYY"           → "April 15, 2025"
 *   "Unix Epoch"              → "1713189045"
 *
 * @param format - One of the supported format strings listed above
 * @returns The formatted timestamp as a plain string
 */
export function generateTimestamp(format: string): string {
  const now = new Date();

  const YYYY = String(now.getFullYear());
  const MM   = pad2(now.getMonth() + 1);       // Months are 0-indexed
  const DD   = pad2(now.getDate());
  const HH   = pad2(now.getHours());
  const mm   = pad2(now.getMinutes());
  const ss   = pad2(now.getSeconds());
  const ms   = pad3(now.getMilliseconds());
  const MMMM = MONTH_NAMES[now.getMonth()];

  switch (format) {
    case 'YYYY-MM-DD HH:mm:ss':
      return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;

    case 'YYYY-MM-DDTHH:mm:ssZ':
      // ISO 8601 format — use native toISOString for full precision
      return now.toISOString().replace(/\.\d{3}Z$/, `.${ms}Z`);

    case 'MM/DD/YYYY HH:mm:ss':
      return `${MM}/${DD}/${YYYY} ${HH}:${mm}:${ss}`;

    case 'DD/MM/YYYY HH:mm:ss':
      return `${DD}/${MM}/${YYYY} ${HH}:${mm}:${ss}`;

    case 'MMMM DD, YYYY':
      return `${MMMM} ${DD}, ${YYYY}`;

    case 'Unix Epoch':
      return String(Math.floor(now.getTime() / 1000));

    default:
      // Fallback to the default readable format
      return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
  }
}
