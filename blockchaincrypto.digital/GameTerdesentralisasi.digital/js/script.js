// JavaScript untuk Gameterdesentralisasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gameterdesentralisasi module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Gameterdesentralisasi diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}