// Main Entry Point - Global Input/Output Configuration
// File naming convention: 
// - Words with 5+ letters: Capital letters at positions 1 and 5
// - Words with less than 5 letters: Capital letter at position 1 only

import CONFIG from './config.js';
import { validateFilename, isSupportedFileType, getValidScriptFiles, getValidStyleFiles, FileExporter } from './utils.js';

/**
 * Initialize global input/output settings
 */
export function initializeGlobalSettings() {
  console.log('Initializing Global Input/Output Settings');
  console.log('Naming Convention:', CONFIG.namingConvention.description);
  console.log('Long Word Pattern (>=5 letters):', CONFIG.namingConvention.longWordPattern);
  console.log('Short Word Pattern (<5 letters):', CONFIG.namingConvention.shortWordPattern);
  console.log('Supported File Types:', CONFIG.fileTypes);
  console.log('All Supported Extensions:', CONFIG.allSupportedExtensions);
  console.log('Source Path:', CONFIG.paths.source);
  console.log('Output Path:', CONFIG.paths.output);
}

/**
 * Import a JS/TS file with validation
 * @param {string} filename - The filename to import
 * @returns {Promise<object>} - The imported module
 */
export async function importScriptFile(filename) {
  if (!validateFilename(filename)) {
    throw new Error(`Invalid filename: ${filename}. Must follow naming convention (Capital at pos 1&5 for words >=5 letters, Capital at pos 1 only for words <5 letters).`);
  }
  
  if (!isSupportedFileType(filename)) {
    throw new Error(`Unsupported file type: ${filename}. Supported types are: ${CONFIG.allSupportedExtensions.join(', ')}`);
  }
  
  try {
    const module = await import(`./${filename}`);
    console.log(`Successfully imported: ${filename}`);
    return module;
  } catch (error) {
    console.error(`Failed to import ${filename}:`, error.message);
    throw error;
  }
}

/**
 * Import a CSS/SCSS/LESS file (dynamically load stylesheet)
 * @param {string} filename - The stylesheet filename to import
 */
export function importStyleFile(filename) {
  if (!validateFilename(filename)) {
    throw new Error(`Invalid filename: ${filename}. Must follow naming convention (Capital at pos 1&5 for words >=5 letters, Capital at pos 1 only for words <5 letters).`);
  }
  
  if (!isSupportedFileType(filename)) {
    throw new Error(`Unsupported file type: ${filename}. Supported types are: ${CONFIG.allSupportedExtensions.join(', ')}`);
  }
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `./${filename}`;
  document.head.appendChild(link);
  console.log(`Successfully loaded style: ${filename}`);
}

/**
 * Export data to a JS/TS file
 * @param {object} data - The data to export
 * @param {string} filename - The target filename
 */
export function exportToScript(data, filename) {
  return FileExporter.exportJS(data, filename);
}

/**
 * Export styles to a CSS/SCSS/LESS file
 * @param {string} styles - The styles to export
 * @param {string} filename - The target filename
 */
export function exportToStyle(styles, filename) {
  return FileExporter.exportCSS(styles, filename);
}

// Export all configuration and utilities
export { CONFIG, validateFilename, isSupportedFileType, getValidScriptFiles, getValidStyleFiles, FileExporter };

export default {
  initializeGlobalSettings,
  importScriptFile,
  importStyleFile,
  exportToScript,
  exportToStyle,
  CONFIG,
  validateFilename,
  isSupportedFileType
};
