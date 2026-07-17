/``
 ` Regional Data Assets untuk SoutheastApp
 ` Data spesifik untuk wilayah Asia Tenggara
 `/

export const regionData = {
  ID: {
    name: 'Indonesia',
    capital: 'Jakarta',
    currency: 'IDR',
    language: 'Bahasa Indonesia',
    timezone: 'Asia/Jakarta',
    population: 273523615,
    gdp: 1186094000000
  },
  MY: {
    name: 'Malaysia',
    capital: 'Kuala Lumpur',
    currency: 'MYR',
    language: 'Bahasa Melayu',
    timezone: 'Asia/Kuala_Lumpur',
    population: 32365999,
    gdp: 432310000000
  },
  SG: {
    name: 'Singapore',
    capital: 'Singapore',
    currency: 'SGD',
    language: 'English',
    timezone: 'Asia/Singapore',
    population: 5850342,
    gdp: 396987000000
  },
  TH: {
    name: 'Thailand',
    capital: 'Bangkok',
    currency: 'THB',
    language: 'Thai',
    timezone: 'Asia/Bangkok',
    population: 69799978,
    gdp: 543496000000
  },
  PH: {
    name: 'Philippines',
    capital: 'Manila',
    currency: 'PHP',
    language: 'Filipino',
    timezone: 'Asia/Manila',
    population: 109581078,
    gdp: 404310000000
  },
  VN: {
    name: 'Vietnam',
    capital: 'Hanoi',
    currency: 'VND',
    language: 'Vietnamese',
    timezone: 'Asia/Ho_Chi_Minh',
    population: 97338579,
    gdp: 362641000000
  },
  MM: {
    name: 'Myanmar',
    capital: 'Naypyidaw',
    currency: 'MMK',
    language: 'Burmese',
    timezone: 'Asia/Yangon',
    population: 54409800,
    gdp: 76085000000
  },
  KH: {
    name: 'Cambodia',
    capital: 'Phnom Penh',
    currency: 'KHR',
    language: 'Khmer',
    timezone: 'Asia/Phnom_Penh',
    population: 16718965,
    gdp: 27089000000
  },
  LA: {
    name: 'Laos',
    capital: 'Vientiane',
    currency: 'LAK',
    language: 'Lao',
    timezone: 'Asia/Vientiane',
    population: 7275560,
    gdp: 19127000000
  },
  BN: {
    name: 'Brunei',
    capital: 'Bandar Seri Begawan',
    currency: 'BND',
    language: 'Malay',
    timezone: 'Asia/Brunei',
    population: 437479,
    gdp: 13804000000
  }
};

export function getRegion(code) {
  return regionData[code] || null;
}

export function getAllRegions() {
  return Object.keys(regionData).map(code => ({
    code,
    ...regionData[code]
  }));
}

export default regionData;
