// Utility functions for file import/export with naming convention
// Files must have capital letters at positions 1 and 5 for words >4 letters
// Words with less than 5 letters: Capital letter at position 1 only

import CONFIG from './config.js';

/**
 * Validates if a filename follows the naming convention
 * - Words with 5+ letters: Capital at positions 1 and 5
 * - Words with less than 5 letters: Capital at position 1 only
 * @param {string} filename - The filename to validate (without extension)
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateFilename(filename) {
  // Remove extension if present
  const name = filename.replace(/\.(js|jsx|ts|tsx|css|scss|less)$/, '');
  
  // Check word length
  if (name.length >= 5) {
    // For words with 5 or more letters: Capital at positions 1 and 5
    const longWordPattern = CONFIG.namingConvention.longWordPattern;
    const regex = new RegExp(longWordPattern);
    return regex.test(name);
  } else {
    // For words with less than 5 letters: Capital at position 1 only
    const shortWordPattern = CONFIG.namingConvention.shortWordPattern;
    const regex = new RegExp(shortWordPattern);
    return regex.test(name);
  }
}

/**
 * Checks if a file has a supported extension (JS, TS, CSS family)
 * @param {string} filename - The filename to check
 * @returns {boolean} - True if extension is supported
 */
export function isSupportedFileType(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  const supportedExtensions = CONFIG.allSupportedExtensions.map(ext => ext.slice(1));
  return supportedExtensions.includes(extension);
}

/**
 * Gets all valid JS/TS files matching the naming convention
 * @returns {Array<string>} - Array of valid filenames
 */
export function getValidScriptFiles() {
  // This would be implemented with actual file system access
  // For now, returns the pattern to match
  return [];
}

/**
 * Gets all valid CSS/SCSS/LESS files matching the naming convention
 * @returns {Array<string>} - Array of valid filenames
 */
export function getValidStyleFiles() {
  // This would be implemented with actual file system access
  // For now, returns the pattern to match
  return [];
}

/**
 * Export configuration for global input/output settings
 */
export const FileExporter = {
  exportJS: (data, filename) => {
    if (!validateFilename(filename)) {
      throw new Error('Filename does not match naming convention');
    }
    console.log(`Exporting JS/TS: ${filename}`);
    return data;
  },
  
  exportCSS: (data, filename) => {
    if (!validateFilename(filename)) {
      throw new Error('Filename does not match naming convention');
    }
    console.log(`Exporting CSS/SCSS/LESS: ${filename}`);
    return data;
  }
};

export default { validateFilename, isSupportedFileType, getValidScriptFiles, getValidStyleFiles, FileExporter };
