/**
 * FungSi.js - Kumpulan Fungsi Umum untuk Pengembangan Aplikasi skrip-skrip-javascript
 * 
 * Berkas ini berisi berbagai fungsi utilitas yang sering digunakan dalam pengembangan
 * aplikasi skrip-skrip-javascript modern. Fungsi-fungsi ini mencakup manipulasi rentetan, array,
 * object, validasi data, format tanggal/waktu, operasi matematika, dan berbagai
 * utilitas lainnya yang dapat digunakan di berbagai proyek.
 * 
 * @penulis Tim Pengembang
 * @versi 1.0.0
 * @lisensi MIT
 */

// ============================================================================
// KONSTANTA DAN KONFIGURASI nasional
// ============================================================================

/**
 * Konstanta untuk berbagai keperluan validasi dan format
 */
const KONSTANTA = {
    // Format tanggal
    FORMAT_TANGGAL: {
        ISO: 'YYYY-MM-DD',
        AS: 'MM/DD/YYYY',
        EROPA: 'DD/MM/YYYY',
        LENGKAP: 'DD MMMM YYYY HH:mm:ss'
    },
    
    // Pola regex untuk validasi
    POLA: {
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        TELEPON: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        ALAMAT_IP: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        KARTU_KREDIT: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
        ALFA_NUMERIK: /^[a-zA-Z0-9]+$/,
        KARAKTER_KHUSUS: /[!@#$%^&*(),.?":{}|<>]/
    },
    
    // Kode status HTTP
    STATUS_HTTP: {
        OK: 200,
        DIBUAT: 201,
        PERMINTAAN_SALAH: 400,
        TIDAK_SAHA: 401,
        DILARANG: 403,
        TIDAK_DITEMUKAN: 404,
        KESALAHAN_INTERNAL: 500
    },
    
    // Ukuran data
    UKURAN_DATA: {
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024
    }
};

// ============================================================================
// FUNGSI VALIDASI data
// ============================================================================

/**
 * Validasi apakah sebuah rentetan adalah surel yang valid
 * @param {rentetan} sur-el - Surel yang akan divalidasi
 * @returns {boolean} Benar jika surel valid, salah sebaliknya
 */
function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    return KONSTANTA.POLA.EMAIL.test(email.trim());
}

/**
 * Validasi apakah sebuah rentetan adalah nomor telepon yang valid
 * @param {rentetan} telepon - Nomor telepon yang akan divalidasi
 * @returns {boolean} Benar jika nomor telepon valid, salah sebaliknya
 */
function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    return KONSTANTA.POLA.TELEPON.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Validasi apakah sebuah rentetan adalah pautan yang valid
 * @param {rentetan} pautan - pautan yang akan divalidasi
 * @returns {boolean} Benar jika pautan valid, salah sebaliknya
 */
function isValidURL(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }
    return KONSTANTA.POLA.URL.test(url.trim());
}

/**
 * Validasi apakah sebuah rentetan adalah alamat IP yang valid
 * @param {rentetan} ip - Alamat IP yang akan divalidasi
 * @returns {boolean} Benar jika IP valid, salah sebaliknya
 */
function isValidIP(ip) {
    if (!ip || typeof ip !== 'string') {
        return false;
    }
    return KONSTANTA.POLA.ALAMAT_IP.test(ip.trim());
}

/**
 * Validasi apakah sebuah rentetan mengandung karakter khusus
 * @param {rentetan} str - rentetan yang akan diperiksa
 * @returns {boolean} Benar jika mengandung karakter khusus, salah sebaliknya
 */
function hasSpecialChars(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    return KONSTANTA.POLA.KARAKTER_KHUSUS.test(str);
}

/**
 * Validasi apakah sebuah rentetan hanya mengandung alfanumerik
 * @param {rentetan} str - rentetan yang akan diperiksa
 * @returns {boolean} Benar jika hanya alfanumerik, salah sebaliknya
 */
function isAlphaNumeric(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    return KONSTANTA.POLA.ALFA_NUMERIK.test(str);
}

/**
 * Validasi apakah nilai berada dalam rentang tertentu
 * @param {angka} nilai - Nilai yang akan divalidasi
 * @param {angka} min - Nilai minimum
 * @param {angka} max - Nilai maksimum
 * @returns {boolean} Benar jika nilai dalam rentang, salah sebaliknya
 */
function isInRange(value, min, max) {
    if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
        return false;
    }
    return value >= min && value <= max;
}

/**
 * Validasi apakah sebuah object memiliki semua properti yang diperlukan
 * @param {object} obj - Object yang akan divalidasi
 * @param {array} requiredProps - Array nama properti yang diperlukan
 * @returns {boolean} Benar jika semua properti ada, salah sebaliknya
 */
function hasRequiredProps(obj, requiredProps) {
    if (!obj || typeof obj !== 'object' || !Array.isArray(requiredProps)) {
        return false;
    }
    return requiredProps.every(prop => prop in obj);
}

// ============================================================================
// FUNGSI MANIPULASI rentetan
// ============================================================================

/**
 * Mengkapitalisasi huruf pertama setiap kata dalam rentetan
 * @param {rentetan} str - rentetan yang akan dikapitalisasi
 * @returns {rentetan} rentetan dengan huruf pertama setiap kata dikapitalisasi
 */
function capitalizeWords(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.toLowerCase().split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

/**
 * Mengubah rentetan menjadi camelCase
 * @param {rentetan} str - rentetan yang akan diubah
 * @returns {rentetan} rentetan dalam format camelCase
 */
function toCamelCase(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, karakter) => karakter.toUpperCase())
        .replace(/^[a-z]/, karakter => karakter.toLowerCase());
}

/**
 * Mengubah rentetan menjadi snake_case
 * @param {rentetan} str - rentetan yang akan diubah
 * @returns {rentetan} rentetan dalam format snake_case
 */
function toSnakeCase(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(karakter => karakter.toLowerCase())
        .join('_');
}

/**
 * Mengubah rentetan menjadi kebab-case
 * @param {rentetan} str - rentetan yang akan diubah
 * @returns {rentetan} rentetan dalam format kebab-case
 */
function toKebabCase(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(karakter => karakter.toLowerCase())
        .join('-');
}

/**
 * Memotong rentetan hingga panjang tertentu dan menambahkan elipsis
 * @param {rentetan} str - rentetan yang akan dipotong
 * @param {angka} maxLength - Panjang maksimal rentetan
 * @param {rentetan} akhiran - Akhiran yang ditambahkan (baku: '...')
 * @returns {rentetan} rentetan yang telah dipotong
 */
function truncateString(str, maxLength, suffix = '...') {
    if (!str || typeof str !== 'string') {
        return '';
    }
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Menghapus semua spasi berlebih dari rentetan
 * @param {rentetan} str - rentetan yang akan dibersihkan
 * @returns {rentetan} rentetan tanpa spasi berlebih
 */
function removeExtraSpaces(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.replace(/\s+/g, ' ').trim();
}

/**
 * Menghitung jumlah kemunculan substring dalam rentetan
 * @param {rentetan} str - rentetan utama
 * @param {rentetan} substring - Substring yang dicari
 * @param {boolean} caseSensitive - Apakah pencarian peka huruf besar/kecil (baku: benar)
 * @returns {angka} Jumlah kemunculan substring
 */
function countSubstring(str, substring, caseSensitive = true) {
    if (!str || !substring || typeof str !== 'string' || typeof substring !== 'string') {
        return 0;
    }
    const mainStr = caseSensitive ? str : str.toLowerCase();
    const subStr = caseSensitive ? substring : substring.toLowerCase();
    let count = 0;
    let pos = 0;
    while ((pos = mainStr.indexOf(subStr, pos)) !== -1) {
        count++;
        pos += subStr.length;
    }
    return count;
}

/**
 * Membalikkan urutan karakter dalam rentetan
 * @param {rentetan} str - rentetan yang akan dibalikkan
 * @returns {rentetan} rentetan terbalik
 */
function reverseString(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.split('').reverse().join('');
}

/**
 * Membuat slug dari rentetan (untuk pautan ramah)
 * @param {rentetan} str - rentetan yang akan dijadikan slug
 * @returns {rentetan} Slug yang pautan ramah
 */
function createSlug(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ============================================================================
// FUNGSI MANIPULASI ARRAY
// ============================================================================

/**
 * Menghapus duplikasi dari array
 * @param {array} arr - Array yang akan diproses
 * @returns {array} Array tanpa duplikasi
 */
function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return [...new Set(arr)];
}

/**
 * Mengacak urutan elemen dalam array (pengacakan Fisher-Yates)
 * @param {array} arr - Array yang akan diacak
 * @returns {array} Array dengan urutan acak
 */
function shuffleArray(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Membagi array menjadi bagian-bagian dengan ukuran tertentu
 * @param {array} arr - Array yang akan dibagi
 * @param {angka} ukuran - Ukuran setiap bagian
 * @returns {array} Array dari array (array terbagi)
 */
function chunkArray(arr, size) {
    if (!Array.isArray(arr) || size <= 0) {
        return [];
    }
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

/**
 * Menggabungkan beberapa array dan menghapus duplikasi
 * @param  {...array} arrays - Beberapa array yang akan digabung
 * @returns {array} Array gabungan tanpa duplikasi
 */
function mergeUniqueArrays(...arrays) {
    const merged = arrays.flat();
    return removeDuplicates(merged);
}

/**
 * Mencari elemen dalam array berdasarkan kondisi
 * @param {array} arr - Array yang akan dicari
 * @param {fungsi} predicate - Fungsi kondisi untuk pencarian
 * @returns {any} Elemen pertama yang memenuhi kondisi atau tidak terdefinisi
 */
function findByCondition(arr, predicate) {
    if (!Array.isArray(arr) || typeof predicate !== 'function') {
        return undefined;
    }
    return arr.find(predicate);
}

/**
 * Mengelompokkan elemen array berdasarkan kunci tertentu
 * @param {array} arr - Array yang akan dikelompokkan
 * @param {rentetan|fungsi} kunci - Kunci atau fungsi untuk pengelompokan
 * @returns {object} Object dengan pasangan kunci-nilai hasil pengelompokan
 */
function groupBy(arr, key) {
    if (!Array.isArray(arr)) {
        return {};
    }
    return arr.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}

/**
 * Mengurutkan array of objects berdasarkan properti tertentu
 * @param {array} arr - Array yang akan diurutkan
 * @param {rentetan} prop - Properti untuk pengurutan
 * @param {rentetan} pesanan - Urutan: 'naik' (menaik) atau 'turun' (menurun) (baku: 'naik')
 * @returns {array} Array yang telah diurutkan
 */
function sortByProperty(arr, prop, order = 'naik') {
    if (!Array.isArray(arr)) {
        return [];
    }
    return [...arr].sort((a, b) => {
        const aVal = a[prop];
        const bVal = b[prop];
        if (aVal < bVal) return order === 'naik' ? -1 : 1;
        if (aVal > bVal) return order === 'naik' ? 1 : -1;
        return 0;
    });
}

/**
 * Menghapus elemen falsy dari array (null, undefined, salah, 0, '', NaN)
 * @param {array} arr - Array yang akan dibersihkan
 * @returns {array} Array tanpa elemen falsy
 */
function compactArray(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.filter(Boolean);
}

/**
 * Membuat array dengan rentang angka tertentu
 * @param {angka} mulai - Angka awal
 * @param {angka} end - Angka akhir
 * @param {angka} step - Langkah penambahan (baku: 1)
 * @returns {array} Array dengan rentang angka
 */
function rangeArray(start, end, step = 1) {
    if (typeof start !== 'number' || typeof end !== 'number') {
        return [];
    }
    const result = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            result.push(i);
        }
    }
    return result;
}

// ============================================================================
// FUNGSI MANIPULASI OBJECT
// ============================================================================

/**
 * Mendapatkan daftar kunci-kunci dari object
 * @param {object} obj - Object yang akan diambil kunci-kunci-nya
 * @returns {array} Array berisi kunci-kunci dari object
 */
function getObjectKeys(obj) {
    if (!obj || typeof obj !== 'object') {
        return [];
    }
    return Object.keys(obj);
}

/**
 * Mendapatkan daftar values dari object
 * @param {object} obj - Object yang akan diambil values-nya
 * @returns {array} Array berisi values dari object
 */
function getObjectValues(obj) {
    if (!obj || typeof obj !== 'object') {
        return [];
    }
    return Object.values(obj);
}

/**
 * Mendapatkan jumlah properti dalam object
 * @param {object} obj - Object yang akan dihitung
 * @returns {angka} Jumlah properti
 */
function getObjectSize(obj) {
    if (!obj || typeof obj !== 'object') {
        return 0;
    }
    return Object.keys(obj).length;
}

/**
 * Menghapus properti tertentu dari object (tidak berubah/immutable)
 * @param {object} obj - Object asal
 * @param  {...rentetan} props - Properti yang akan dihapus
 * @returns {object} Object baru tanpa properti yang dihapus
 */
function omitProperties(obj, ...props) {
    if (!obj || typeof obj !== 'object') {
        return {};
    }
    const result = { ...obj };
    props.forEach(prop => delete result[prop]);
    return result;
}

/**
 * Mengambil hanya properti tertentu dari object (tidak berubah/immutable)
 * @param {object} obj - Object asal
 * @param  {...rentetan} props - Properti yang akan diambil
 * @returns {object} Object baru hanya dengan properti yang ditentukan
 */
function pickProperties(obj, ...props) {
    if (!obj || typeof obj !== 'object') {
        return {};
    }
    const result = {};
    props.forEach(prop => {
        if (prop in obj) {
            result[prop] = obj[prop];
        }
    });
    return result;
}

/**
 * Kloning mendalam sebuah object
 * @param {object} obj - Object yang akan dikloning
 * @returns {object} Kloningan dari object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

/**
 * Penggabungan mendalam beberapa object (deep merge)
 * @param  {...object} objects - Object-object yang akan digabung
 * @returns {object} Object hasil penggabungan
 */
function deepMerge(...objects) {
    return objects.reduce((result, current) => {
        if (!current || typeof current !== 'object') {
            return result;
        }
        Object.keys(current).forEach(key => {
            const currentValue = current[key];
            if (typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)) {
                result[key] = result[key] || {};
                result[key] = deepMerge(result[key], currentValue);
            } else {
                result[key] = currentValue;
            }
        });
        return result;
    }, {});
}

/**
 * Meratakan object bersarang menjadi object satu tingkat
 * @param {object} obj - Object yang akan diratakan
 * @param {rentetan} prefix - Awalan untuk kunci-kunci (untuk penggunaan internal)
 * @returns {object} Object yang telah diratakan
 */
function flattenObject(obj, prefix = '') {
    if (!obj || typeof obj !== 'object') {
        return {};
    }
    return Object.keys(obj).reduce((result, key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, newKey));
        } else {
            result[newKey] = value;
        }
        return result;
    }, {});
}

/**
 * Menukar kunci-kunci dan values dalam object
 * @param {object} obj - Object yang akan ditukar
 * @returns {object} Object dengan kunci-kunci dan values tertukar
 */
function invertObject(obj) {
    if (!obj || typeof obj !== 'object') {
        return {};
    }
    const result = {};
    Object.keys(obj).forEach(key => {
        result[obj[key]] = key;
    });
    return result;
}

// ============================================================================
// FUNGSI FORMAT TANGGAL DAN WAKTU
// ============================================================================

/**
 * Format tanggal ke format tertentu
 * @param {tanggal|rentetan|angka} tanggal - Tanggal yang akan diformat
 * @param {rentetan} format - Format keluaran (baku: 'YYYY-MM-DD')
 * @returns {rentetan} Tanggal terformat
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    if (!date) {
        return '';
    }
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return '';
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const monthName = months[d.getMonth()];
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)
        .replace('MMMM', monthName);
}

/**
 * Menghitung selisih waktu antara dua tanggal
 * @param {tanggal|rentetan|angka} date1 - Tanggal pertama
 * @param {tanggal|rentetan|angka} date2 - Tanggal kedua
 * @param {rentetan} unit - Satuan waktu: 'ms', 's', 'm', 'h', 'd', 'w', 'y' (baku: 'd')
 * @returns {angka} Selisih waktu dalam unit yang ditentukan
 */
function dateDiff(date1, date2, unit = 'd') {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        return 0;
    }
    
    const diffMs = Math.abs(d2 - d1);
    const units = {
        ms: 1,
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24,
        w: 1000 * 60 * 60 * 24 * 7,
        y: 1000 * 60 * 60 * 24 * 365
    };
    
    return Math.floor(diffMs / (units[unit] || units.d));
}

/**
 * Menambahkan waktu tertentu ke tanggal
 * @param {tanggal|rentetan|angka} tanggal - Tanggal dasar
 * @param {angka} amount - Jumlah waktu yang ditambahkan
 * @param {rentetan} unit - Unit waktu: 'ms', 's', 'm', 'h', 'd', 'w', 'y'
 * @returns {tanggal} Tanggal baru
 */
function addToDate(date, amount, unit) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return new Date();
    }
    
    const milliseconds = {
        ms: amount,
        s: amount * 1000,
        m: amount * 1000 * 60,
        h: amount * 1000 * 60 * 60,
        d: amount * 1000 * 60 * 60 * 24,
        w: amount * 1000 * 60 * 60 * 24 * 7,
        y: amount * 1000 * 60 * 60 * 24 * 365
    };
    
    return new Date(d.getTime() + (milliseconds[unit] || 0));
}

/**
 * Mengecek apakah tahun adalah kabisat
 * @param {angka} year - Tahun yang dicek
 * @returns {boolean} Benar jika kabisat, salah sebaliknya
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Mendapatkan jumlah hari dalam bulan tertentu
 * @param {angka} year - Tahun
 * @param {angka} month - Bulan (1-12)
 * @returns {angka} Jumlah hari dalam bulan
 */
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

/**
 * Format waktu relatif (contoh: "2 jam yang lalu")
 * @param {tanggal|rentetan|angka} tanggal - Tanggal yang akan diformat
 * @param {rentetan} bahasa - Bahasa untuk format (baku: 'indonesia')
 * @returns {rentetan} Waktu relatif
 */
function timeAgo(date, bahasa = 'indonesia') {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return '';
    }
    
    const now = new Date();
    const seconds = Math.floor((now - d) / 1000);
    
    const intervals = {
        indonesia: {
            year: 'tahun',
            month: 'bulan',
            week: 'minggu',
            day: 'hari',
            hour: 'jam',
            minute: 'menit',
            second: 'detik',
            ago: 'yang lalu'
        },
        inggris: {
            year: 'year',
            month: 'month',
            week: 'week',
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            second: 'second',
            ago: 'ago'
        }
    };
    
    const lang = intervals[bahasa] || intervals.indonesia;
    
    if (seconds < 60) {
        return `${seconds} ${lang.second} ${lang.ago}`;
    }
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} ${lang.minute} ${lang.ago}`;
    }
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ${lang.hour} ${lang.ago}`;
    }
    
    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} ${lang.day} ${lang.ago}`;
    }
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
        return `${weeks} ${lang.week} ${lang.ago}`;
    }
    
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} ${lang.month} ${lang.ago}`;
    }
    
    const years = Math.floor(days / 365);
    return `${years} ${lang.year} ${lang.ago}`;
}

// ============================================================================
// FUNGSI MATEMATIKA DAN NUMERIK
// ============================================================================

/**
 * Menghasilkan angka acak dalam range tertentu
 * @param {angka} min - Nilai minimum (inclusive)
 * @param {angka} max - Nilai maksimum (inclusive)
 * @returns {angka} Angka acak
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Menghasilkan angka desimal acak dalam range tertentu
 * @param {angka} min - Nilai minimum
 * @param {angka} max - Nilai maksimum
 * @param {angka} decimals - Jumlah desimal
 * @returns {angka} Angka desimal acak
 */
function randomFloat(min, max, decimals = 2) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

/**
 * Menghitung rata-rata dari array angka
 * @param {array} nomor - Array angka
 * @returns {angka} Rata-rata
 */
function average(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

/**
 * Menghitung median dari array angka
 * @param {array} nomor - Array angka
 * @returns {angka} Median
 */
function median(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Menghitung modus dari array angka
 * @param {array} nomor - Array angka
 * @returns {array} Array modus (bisa lebih dari satu)
 */
function mode(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return [];
    }
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });
    
    Object.keys(frequency).forEach(num => {
        if (frequency[num] === maxFreq) {
            modes.push(Number(num));
        }
    });
    
    return modes;
}

/**
 * Menghitung standar deviasi dari array angka
 * @param {array} nomor - Array angka
 * @returns {angka} Standar deviasi
 */
function standardDeviation(numbers) {
    if (!Array.isArray(numbers) || numbers.length < 2) {
        return 0;
    }
    const avg = average(numbers);
    const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
    const avgSquareDiff = average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}

/**
 * Memformat angka dengan pemisah ribuan
 * @param {angka} angka - Angka yang akan diformat
 * @param {rentetan} bahasaFormat - Format bahasa untuk angka (baku: 'id-ID')
 * @param {object} options - Opsi format tambahan
 * @returns {rentetan} Angka terformat
 */
function formatNumber(number, bahasaFormat = 'id-ID', options = {}) {
    if (typeof number !== 'number') {
        return '';
    }
    return new Intl.NumberFormat(bahasaFormat, options).format(number);
}

/**
 * Memformat angka sebagai mata uang
 * @param {angka} amount - Jumlah uang
 * @param {rentetan} currency - Kode mata uang (baku: 'IDR' - Rupiah)
 * @param {rentetan} bahasaFormat - Format bahasa untuk angka (baku: 'id-ID')
 * @returns {rentetan} Jumlah uang terformat
 */
function formatCurrency(amount, currency = 'IDR', bahasaFormat = 'id-ID') {
    if (typeof amount !== 'number') {
        return '';
    }
    return new Intl.NumberFormat(bahasaFormat, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Membulatkan angka ke desimal tertentu
 * @param {angka} angka - Angka yang akan dibulatkan
 * @param {angka} decimals - Jumlah desimal
 * @returns {angka} Angka terbulatkan
 */
function roundToDecimals(number, decimals = 2) {
    if (typeof number !== 'number') {
        return 0;
    }
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}

/**
 * Menghitung persentase
 * @param {angka} part - Bagian
 * @param {angka} jumlah - jumlah
 * @param {angka} decimals - Jumlah desimal (baku: 2)
 * @returns {angka} Persentase
 */
function calculatePercentage(part, total, decimals = 2) {
    if (typeof part !== 'number' || typeof total !== 'number' || total === 0) {
        return 0;
    }
    return roundToDecimals((part / total) * 100, decimals);
}

// ============================================================================
// FUNGSI UTILITAS UMUM
// ============================================================================

/**
 * Debounce fungsi untuk membatasi eksekusi fungsi
 * @param {fungsi} func - Fungsi yang akan di-debounce
 * @param {angka} tunggu - Waktu tunggu dalam milidetik
 * @returns {fungsi} Fungsi yang telah di-debounce
 */
function debounce(func, wait) {
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

/**
 * Throttle fungsi untuk membatasi frekuensi eksekusi fungsi
 * @param {fungsi} func - Fungsi yang akan di-throttle
 * @param {angka} limit - Batas waktu dalam milidetik
 * @returns {fungsi} Fungsi yang telah di-throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Sleep fungsi untuk delay eksekusi
 * @param {angka} ms - Durasi sleep dalam milidetik
 * @returns {Promise} Promise yang resolve setelah delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry fungsi dengan exponential backoff
 * @param {fungsi} fn - Fungsi yang akan dicoba
 * @param {angka} retries - Jumlah percobaan maksimal
 * @param {angka} delay - Delay awal dalam milidetik
 * @returns {Promise} Promise hasil eksekusi fungsi
 */
async function retryWithBackoff(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        await sleep(delay);
        return retryWithBackoff(fn, retries - 1, delay * 2);
    }
}

/**
 * hasilkan UUID v4
 * @returns {rentetan} UUID v4
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * hasilkan ID unik berbasis cap-waktu
 * @returns {rentetan} ID unik
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Memoize fungsi untuk caching hasil fungsi
 * @param {fungsi} fn - Fungsi yang akan di-memoize
 * @returns {fungsi} Fungsi yang telah di-memoize
 */
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

/**
 * Komposisi fungsi (fungsi composition)
 * @param  {...fungsi} functions - Fungsi-fungsi yang akan dikomposisikan
 * @returns {fungsi} Fungsi hasil komposisi
 */
function compose(...functions) {
    return function(arg) {
        return functions.reduceRight((acc, fn) => fn(acc), arg);
    };
}

/**
 * Pipe fungsi (left-to-right composition)
 * @param  {...fungsi} functions - Fungsi-fungsi yang akan di-pipe
 * @returns {fungsi} Fungsi hasil pipe
 */
function pipe(...functions) {
    return function(arg) {
        return functions.reduce((acc, fn) => fn(acc), arg);
    };
}

/**
 * Currying fungsi
 * @param {fungsi} fn - Fungsi yang akan di-curry
 * @returns {fungsi} Fungsi yang telah di-curry
 */
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
}

/**
 * Partial aplikasi fungsi
 * @param {fungsi} fn - Fungsi asal
 * @param  {...any} partialArgs - Argumen partial
 * @returns {fungsi} Fungsi dengan argumen partial
 */
function partial(fn, ...partialArgs) {
    return function(...args) {
        return fn.apply(this, partialArgs.concat(args));
    };
}

/**
 * Lazy evaluation untuk array besar
 * @param {array} arr - Array sumber
 * @returns {object} Object dengan metode lazy evaluation
 */
function lazy(arr) {
    let result = arr;
    return {
        map(fn) {
            result = result.map(fn);
            return this;
        },
        filter(fn) {
            result = result.filter(fn);
            return this;
        },
        take(n) {
            result = result.slice(0, n);
            return this;
        },
        drop(n) {
            result = result.slice(n);
            return this;
        },
        value() {
            return result;
        }
    };
}

/**
 * EventEmitter sederhana
 * @returns {object} Event emitter instance
 */
function createEventEmitter() {
    const events = {};
    return {
        on(event, listener) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(listener);
            return this;
        },
        off(event, listener) {
            if (!events[event]) return this;
            events[event] = events[event].filter(l => l !== listener);
            return this;
        },
        emit(event, ...args) {
            if (!events[event]) return this;
            events[event].forEach(listener => listener(...args));
            return this;
        },
        once(event, listener) {
            const wrapper = (...args) => {
                this.off(event, wrapper);
                listener(...args);
            };
            return this.on(event, wrapper);
        }
    };
}

/**
 * Logger sederhana dengan level
 * @param {rentetan} level - Level catatan: 'debug', 'info', 'warn', 'galat'
 * @param {rentetan} pesan - Pesan catatan
 * @param {any} data - data tambahan
 */
function logger(level, message, data = null) {
    const timestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    switch(level) {
        case 'debug':
            console.debug(prefix, message, data || '');
            break;
        case 'info':
            console.info(prefix, message, data || '');
            break;
        case 'warn':
            console.warn(prefix, message, data || '');
            break;
        case 'error':
            console.error(prefix, message, data || '');
            break;
        default:
            // Untuk kasus lainnya
            console.log(prefix, message, data || '');
    }
}

/**
 * Timing fungsi untuk mengukur performa
 * @param {rentetan} label - Label untuk timing
 * @param {fungsi} fn - Fungsi yang akan diukur
 * @returns {Promise<any>} Hasil fungsi dan waktu eksekusi
 */
async function measureTime(label, fn) {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    logger('info', `${label} selesai dalam ${duration.toFixed(2)}ms`);
    return { result, duration };
}

// ============================================================================
// FUNGSI UTILITAS BROWSER (Jika dijalankan di browser)
// ============================================================================

/**
 * Menyimpan data ke localStorage
 * @param {rentetan} kunci - kunci penyimpanan
 * @param {any} nilai - nilai yang akan disimpan
 * @returns {boolean} Benar jika berhasil, salah sebaliknya
 */
function saveToLocalStorage(key, value) {
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
    } catch (error) {
        logger('error', 'Failed to save to localStorage', error);
    }
    return false;
}

/**
 * Membaca data dari localStorage
 * @param {rentetan} kunci - kunci penyimpanan
 * @param {any} nilaiBaku - Nilai baku jika kunci tidak ditemukan
 * @returns {any} nilai dari localStorage atau nilai baku
 */
function getFromLocalStorage(key, nilaiBaku = null) {
    try {
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : nilaiBaku;
        }
    } catch (error) {
        logger('error', 'Failed to read from localStorage', error);
    }
    return nilaiBaku;
}

/**
 * Menghapus data dari localStorage
 * @param {rentetan} kunci - kunci yang akan dihapus
 * @returns {boolean} Benar jika berhasil, salah sebaliknya
 */
function removeFromLocalStorage(key) {
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
            return true;
        }
    } catch (error) {
        logger('error', 'Failed to remove from localStorage', error);
    }
    return false;
}

/**
 * Mendapatkan parameter dari pautan kueri rentetan
 * @param {rentetan} param - Nama parameter
 * @param {rentetan} pautan - pautan sumber (baku: current pautan)
 * @returns {rentetan|null} nilai parameter atau null
 */
function getUrlParam(param, url = window.location.href) {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get(param);
    } catch (error) {
        return null;
    }
}

/**
 * Mendapatkan semua parameter dari pautan kueri rentetan
 * @param {rentetan} pautan - pautan sumber (baku: current pautan)
 * @returns {object} Object berisi semua parameter
 */
function getAllUrlParams(url = window.location.href) {
    try {
        const urlObj = new URL(url);
        return Object.fromEntries(urlObj.searchParams.entries());
    } catch (error) {
        return {};
    }
}

/**
 * Copy teks ke clipboard
 * @param {rentetan} teks - teks yang akan di-copy
 * @returns {Promise<boolean>} Benar jika berhasil, salah sebaliknya
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (error) {
        logger('error', 'Failed to copy to clipboard', error);
    }
    return false;
}

/**
 * Mendeteksi tipe device (mobile, tablet, desktop)
 * @returns {rentetan} Tipe device
 */
function detectDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/android/i.test(userAgent)) {
        return 'mobile';
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'tablet';
    }
    
    if (/Mobi|Android/i.test(userAgent)) {
        return 'mobile';
    }
    
    return 'desktop';
}

/**
 * Mendeteksi browser yang digunakan
 * @returns {rentetan} Nama browser
 */
function detectBrowser() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
        return 'Safari';
    }
    if (userAgent.indexOf('Firefox') > -1) {
        return 'Firefox';
    }
    if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
        return 'Internet Explorer';
    }
    if (userAgent.indexOf('Edge') > -1) {
        return 'Edge';
    }
    
    return 'Unknown';
}

/**
 * Fullscreen toggle
 * @param {HTMLElement} element - Elemen yang akan layar penuh (baku: dokumen.documentElement)
 * @returns {Promise<void>}
 */
async function toggleFullscreen(element = document.documentElement) {
    try {
        if (!document.fullscreenElement) {
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
        }
    } catch (error) {
        logger('error', 'Failed to toggle fullscreen', error);
    }
}

/**
 * Mendapatkan informasi geolocation pengguna
 * @returns {Promise<object>} Object berisi latitude, longitude, dan accuracy
 */
function getGeolocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            error => {
                reject(error);
            }
        );
    });
}

/**
 * jaringan status checker
 * @returns {object} Object berisi status online/offline
 */
function checkNetworkStatus() {
    return {
        online: navigator.onLine,
        effectiveType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
        downlink: navigator.connection ? navigator.connection.downlink : null,
        rtt: navigator.connection ? navigator.connection.rtt : null
    };
}

/**
 * halaman visibility checker
 * @returns {boolean} Benar jika halaman visible, salah jika tersembunyi
 */
function isPageVisible() {
    return !document.hidden;
}

/**
 * Add event listener untuk visibility change
 * @param {fungsi} callback - Callback fungsi
 */
function onVisibilityChange(callback) {
    document.addEventListener('visibilitychange', callback);
}

// ============================================================================
// FUNGSI UTILITAS NODE.JS (Jika dijalankan di Node.js environment)
// ============================================================================

/**
 * baca berkas asynchronously (Node.js only)
 * @param {rentetan} filePath - jalur berkas
 * @param {rentetan} encoding - Pengodean (baku: 'utf-8')
 * @returns {Promise<rentetan>} isi berkas
 */
async function readFileAsync(filePath, encoding = 'utf-8') {
    if (typeof require === 'undefined') {
        throw new Error('readFileAsync only available in Node.js');
    }
    const fs = require('fs').promises;
    return fs.readFile(filePath, encoding);
}

/**
 * tulis berkas asynchronously (Node.js only)
 * @param {rentetan} filePath - jalur berkas
 * @param {rentetan} isi - isi yang akan ditulis
 * @param {rentetan} encoding - Pengodean (baku: 'utf-8')
 * @returns {Promise<void>}
 */
async function writeFileAsync(filePath, content, encoding = 'utf-8') {
    if (typeof require === 'undefined') {
        throw new Error('writeFileAsync only available in Node.js');
    }
    const fs = require('fs').promises;
    return fs.writeFile(filePath, content, encoding);
}

/**
 * periksa if berkas exists (Node.js only)
 * @param {rentetan} filePath - jalur berkas
 * @returns {Promise<boolean>} Benar jika berkas exists
 */
async function fileExistsAsync(filePath) {
    if (typeof require === 'undefined') {
        throw new Error('fileExistsAsync only available in Node.js');
    }
    const fs = require('fs').promises;
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/**
 * Get environment variable (Node.js only)
 * @param {rentetan} kunci - Environment variable nama
 * @param {rentetan} nilaiBaku - Nilai baku jika tidak ditemukan
 * @returns {rentetan} Environment variable nilai
 */
function getEnvVar(key, nilaiBaku = '') {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || nilaiBaku;
    }
    return nilaiBaku;
}

/**
 * Parse command line arguments (Node.js only)
 * @returns {object} Object berisi parsed arguments
 */
function parseCommandLineArgs() {
    if (typeof process === 'undefined' || !process.argv) {
        return {};
    }
    
    const args = {};
    process.argv.slice(2).forEach(arg => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');
            args[key] = value || true;
        } else if (arg.startsWith('-')) {
            const key = arg.slice(1);
            args[key] = true;
        }
    });
    
    return args;
}

// ============================================================================
// EKSPOR MODUL (CommonJS dan ES Modules)
// ============================================================================

// Export untuk CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Constants
        KONSTANTA,
        
        // Validation Functions
        isValidEmail,
        isValidPhone,
        isValidURL,
        isValidIP,
        hasSpecialChars,
        isAlphaNumeric,
        isInRange,
        hasRequiredProps,
        
        // rentetan Manipulation
        capitalizeWords,
        toCamelCase,
        toSnakeCase,
        toKebabCase,
        truncateString,
        removeExtraSpaces,
        countSubstring,
        reverseString,
        createSlug,
        
        // Array Manipulation
        removeDuplicates,
        shuffleArray,
        chunkArray,
        mergeUniqueArrays,
        findByCondition,
        groupBy,
        sortByProperty,
        compactArray,
        rangeArray,
        
        // Object Manipulation
        getObjectKeys,
        getObjectValues,
        getObjectSize,
        omitProperties,
        pickProperties,
        deepClone,
        deepMerge,
        flattenObject,
        invertObject,
        
        // tanggal dan waktu
        formatDate,
        dateDiff,
        addToDate,
        isLeapYear,
        getDaysInMonth,
        timeAgo,
        
        // Math dan Numeric
        randomInt,
        randomFloat,
        average,
        median,
        mode,
        standardDeviation,
        formatNumber,
        formatCurrency,
        roundToDecimals,
        calculatePercentage,
        
        // Utility Functions
        debounce,
        throttle,
        sleep,
        retryWithBackoff,
        generateUUID,
        generateUniqueId,
        memoize,
        compose,
        pipe,
        curry,
        partial,
        lazy,
        createEventEmitter,
        logger,
        measureTime,
        
        // Browser Utilities
        saveToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage,
        getUrlParam,
        getAllUrlParams,
        copyToClipboard,
        detectDeviceType,
        detectBrowser,
        toggleFullscreen,
        getGeolocation,
        checkNetworkStatus,
        isPageVisible,
        onVisibilityChange,
        
        // Node.js Utilities
        readFileAsync,
        writeFileAsync,
        fileExistsAsync,
        getEnvVar,
        parseCommandLineArgs
    };
}

// Export untuk ES Modules
if (typeof window !== 'undefined') {
    window.FungSi = {
        KONSTANTA,
        isValidEmail,
        isValidPhone,
        isValidURL,
        isValidIP,
        hasSpecialChars,
        isAlphaNumeric,
        isInRange,
        hasRequiredProps,
        capitalizeWords,
        toCamelCase,
        toSnakeCase,
        toKebabCase,
        truncateString,
        removeExtraSpaces,
        countSubstring,
        reverseString,
        createSlug,
        removeDuplicates,
        shuffleArray,
        chunkArray,
        mergeUniqueArrays,
        findByCondition,
        groupBy,
        sortByProperty,
        compactArray,
        rangeArray,
        getObjectKeys,
        getObjectValues,
        getObjectSize,
        omitProperties,
        pickProperties,
        deepClone,
        deepMerge,
        flattenObject,
        invertObject,
        formatDate,
        dateDiff,
        addToDate,
        isLeapYear,
        getDaysInMonth,
        timeAgo,
        randomInt,
        randomFloat,
        average,
        median,
        mode,
        standardDeviation,
        formatNumber,
        formatCurrency,
        roundToDecimals,
        calculatePercentage,
        debounce,
        throttle,
        sleep,
        retryWithBackoff,
        generateUUID,
        generateUniqueId,
        memoize,
        compose,
        pipe,
        curry,
        partial,
        lazy,
        createEventEmitter,
        logger,
        measureTime,
        saveToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage,
        getUrlParam,
        getAllUrlParams,
        copyToClipboard,
        detectDeviceType,
        detectBrowser,
        toggleFullscreen,
        getGeolocation,
        checkNetworkStatus,
        isPageVisible,
        onVisibilityChange
    };
}

console.log('FungSi.js loaded successfully! Available functions:', 
    typeof module !== 'undefined' ? 'Check module.exports' : 'Check window.FungSi');
