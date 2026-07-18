// JavaScript untuk Tokencsrf
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tokencsrf module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Tokencsrf diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}