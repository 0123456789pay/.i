/**
 * SoutheastApp Utility Helpers
 * Fungsi-fungsi bantuan untuk sistem
 */

// Format file size
export function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

// Generate unique ID
export function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Deep clone object
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Sleep utility
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry with exponential backoff
export async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay * 2);
  }
}

export default {
  formatSize,
  generateId,
  deepClone,
  debounce,
  throttle,
  sleep,
  retry
};
