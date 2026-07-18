// JavaScript untuk Fabrikasidata
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fabrikasidata module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Fabrikasidata diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}