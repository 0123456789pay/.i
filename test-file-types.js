// Test script untuk validasi file types JS, TS, CSS family
import { validateFilename, isSupportedFileType } from './utils.js';

console.log('=== Testing File Type Support ===\n');

// Test cases untuk berbagai tipe file
const testCases = [
  // Short words (<5 letters) - should be valid with capital at pos 1 only
  { filename: 'Card.js', expected: true, type: 'short-valid' },
  { filename: 'Icon.css', expected: true, type: 'short-valid' },
  { filename: 'Menu.ts', expected: true, type: 'short-valid' },
  { filename: 'All.scss', expected: true, type: 'short-valid' },
  { filename: 'Big.less', expected: true, type: 'short-valid' },
  
  // Long words (>=5 letters) - should be valid with capital at pos 1 and 5
  { filename: 'FlexBox.js', expected: true, type: 'long-valid' },
  { filename: 'CellData.css', expected: true, type: 'long-valid' },
  { filename: 'RichText.ts', expected: true, type: 'long-valid' },
  { filename: 'TimePicker.jsx', expected: true, type: 'long-valid' },
  { filename: 'CodeEditor.tsx', expected: true, type: 'long-valid' },
  { filename: 'BackDrop.scss', expected: true, type: 'long-valid' },
  { filename: 'WideScreen.less', expected: true, type: 'long-valid' },
  
  // Invalid cases
  { filename: 'card.js', expected: false, type: 'invalid-no-capital' },
  { filename: 'Flexbox.js', expected: false, type: 'invalid-long-no-cap-5' },
  { filename: 'CARD.js', expected: false, type: 'invalid-all-caps' },
  { filename: 'test.txt', expected: false, type: 'invalid-extension' },
];

let passed = 0;
let failed = 0;

testCases.forEach(({ filename, expected, type }) => {
  const isValid = validateFilename(filename);
  const isSupported = isSupportedFileType(filename);
  
  // Check if validation matches expectation
  const validationMatch = isValid === expected;
  
  // For extension check, only .js, .jsx, .ts, .tsx, .css, .scss, .less are supported
  const ext = filename.split('.').pop().toLowerCase();
  const expectedSupport = ['js', 'jsx', 'ts', 'tsx', 'css', 'scss', 'less'].includes(ext);
  const supportMatch = isSupported === expectedSupport;
  
  const overallPass = validationMatch && supportMatch;
  
  if (overallPass) {
    console.log(`✓ PASS: ${filename} (${type})`);
    console.log(`  - Validation: ${isValid} (expected: ${expected})`);
    console.log(`  - Supported: ${isSupported} (expected: ${expectedSupport})`);
    passed++;
  } else {
    console.log(`✗ FAIL: ${filename} (${type})`);
    console.log(`  - Validation: ${isValid} (expected: ${expected}) ${validationMatch ? '✓' : '✗'}`);
    console.log(`  - Supported: ${isSupported} (expected: ${expectedSupport}) ${supportMatch ? '✓' : '✗'}`);
    failed++;
  }
  console.log('');
});

console.log('=== Summary ===');
console.log(`Passed: ${passed}/${testCases.length}`);
console.log(`Failed: ${failed}/${testCases.length}`);

if (failed === 0) {
  console.log('\n✓ All tests passed!');
} else {
  console.log('\n✗ Some tests failed!');
  process.exit(1);
}
