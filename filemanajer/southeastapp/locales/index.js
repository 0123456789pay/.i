/**
 * Locale Index untuk SoutheastApp
 * Sistem multi-bahasa untuk Asia Tenggara
 */

import idID from './id-ID.js';

export const locales = {
  'id-ID': idID,
  'en-US': {
    common: {
      welcome: 'Welcome',
      goodbye: 'Goodbye',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort'
    },
    components: {
      pattern: 'Component pattern: 1st & 5th char UPPERCASE',
      registered: 'Component registered',
      notFound: 'Component not found'
    },
    storage: {
      unlimited: 'Unlimited Storage',
      stored: 'Data stored',
      retrieved: 'Data retrieved',
      deleted: 'Data deleted',
      stats: 'Storage Statistics'
    },
    regions: {
      select: 'Select Region',
      current: 'Current Region'
    }
  }
};

export function getLocale(code) {
  return locales[code] || locales['en-US'];
}

export function t(code, path) {
  const locale = getLocale(code);
  const keys = path.split('.');
  let value = locale;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path;
    }
  }
  
  return value;
}

export default locales;
