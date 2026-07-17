// Global Configuration for Input/Output Settings
// File naming convention: 
// - Words with 5+ letters: Capital letters at positions 1 and 5
// - Words with less than 5 letters: Capital letter at position 1 only

const CONFIG = {
  namingConvention: {
    // For words with 5 or more letters: Capital at positions 1 and 5
    longWordPattern: '^[A-Z][a-z]{3}[A-Z]',
    // For words with less than 5 letters: Capital at position 1 only
    shortWordPattern: '^[A-Z][a-z]*$',
    description: 'Capital letters at positions 1 and 5 for words >4 letters, position 1 only for words <5 letters'
  },
  fileTypes: {
    javascript: ['.js', '.jsx'],
    typescript: ['.ts', '.tsx'],
    stylesheet: ['.css', '.scss', '.less']
  },
  allSupportedExtensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less'],
  paths: {
    source: './',
    output: './dist/'
  }
};

export default CONFIG;
