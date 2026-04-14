/**
 * localStorage helpers for Caloriq.
 * Requires global.js (today()) to be loaded first.
 *
 * Storage schema:
 *   goal              — 'lose' | 'keep' | 'gain'
 *   calories          — number (daily kcal target)
 *   presets           — [{name, kcal, cat, emoji, photo}]
 *   logs_YYYY-MM-DD   — [{name, kcal, emoji, photo, time}]
 */

/**
 * Save logs array for today.
 * @param {Array} logs
 */
function saveLogs(logs) {
  localStorage.setItem('logs_' + today(), JSON.stringify(logs));
}

/**
 * Load logs array for today.
 * @returns {Array}
 */
function getLogs() {
  return JSON.parse(localStorage.getItem('logs_' + today()) || '[]');
}

/**
 * Save presets array.
 * @param {Array} presets
 */
function savePresets(presets) {
  localStorage.setItem('presets', JSON.stringify(presets));
}

/**
 * Load presets array.
 * @returns {Array}
 */
function getPresets() {
  return JSON.parse(localStorage.getItem('presets') || '[]');
}
