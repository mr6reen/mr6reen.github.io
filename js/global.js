/**
 * Global utilities used across all pages.
 * Load before storage.js and page scripts.
 */

/**
 * Returns today's date as YYYY-MM-DD in LOCAL timezone.
 * Uses local date to avoid UTC offset bug — e.g. UTC+3 at 00:10
 * would return yesterday's date with toISOString().
 * @returns {string} e.g. '2026-04-15'
 */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Formats a Unix timestamp to HH:MM in Russian locale.
 * @param {number} ts - Unix timestamp in milliseconds
 * @returns {string} e.g. '14:35'
 */
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Daily calorie goal from localStorage.
 * Read once at page load — reflects current setting.
 * @type {number}
 */
const DAILY = parseInt(localStorage.getItem('calories')) || 2000;
