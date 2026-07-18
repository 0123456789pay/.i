// JavaScript untuk Eksplorasigas
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eksplorasigas module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Eksplorasigas diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}