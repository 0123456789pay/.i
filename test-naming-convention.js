// Test script untuk validasi konvensi penamaan file
// Menjalankan tes untuk kata dengan >= 5 huruf dan < 5 huruf

import { validateFilename } from './utils.js';

console.log('=== Testing File Naming Convention ===\n');

// Test cases untuk kata dengan 5+ huruf (harus kapital di posisi 1 & 5)
const longWordTests = [
  { filename: 'BlocKed', expected: true, description: '7 huruf, kapital di 1&5' },
  { filename: 'CellData', expected: true, description: '8 huruf, kapital di 1&5' },
  { filename: 'FlexBox', expected: true, description: '7 huruf, kapital di 1&5' },
  { filename: 'Accepted', expected: false, description: '8 huruf, TIDAK kapital di 5' },
  { filename: 'blocked', expected: false, description: '7 huruf, semua lowercase' },
  { filename: 'BLOCKED', expected: false, description: '7 huruf, semua uppercase' },
  { filename: 'FormAtt', expected: true, description: '7 huruf, kapital di 1&5' }
];

console.log('--- Long Words (>= 5 letters) ---');
longWordTests.forEach(test => {
  const result = validateFilename(test.filename);
  const status = result === test.expected ? '✓ PASS' : '✗ FAIL';
  console.log(`${status}: ${test.filename} (${test.description}) - Expected: ${test.expected}, Got: ${result}`);
});

// Test cases untuk kata dengan < 5 huruf (hanya kapital di posisi 1)
const shortWordTests = [
  { filename: 'All', expected: true, description: '3 huruf, kapital di 1' },
  { filename: 'Any', expected: true, description: '3 huruf, kapital di 1' },
  { filename: 'Big', expected: true, description: '3 huruf, kapital di 1' },
  { filename: 'Card', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'Code', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'Done', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'Icon', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'List', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'Menu', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'Tabs', expected: true, description: '4 huruf, kapital di 1' },
  { filename: 'card', expected: false, description: '4 huruf, semua lowercase' },
  { filename: 'CARD', expected: false, description: '4 huruf, semua uppercase' },
  { filename: 'CaRd', expected: false, description: '4 huruf, kapital di 1&3 (salah)' }
];

console.log('\n--- Short Words (< 5 letters) ---');
shortWordTests.forEach(test => {
  const result = validateFilename(test.filename);
  const status = result === test.expected ? '✓ PASS' : '✗ FAIL';
  console.log(`${status}: ${test.filename} (${test.description}) - Expected: ${test.expected}, Got: ${result}`);
});

console.log('\n=== Test Complete ===');
