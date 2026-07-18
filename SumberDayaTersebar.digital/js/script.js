// JavaScript untuk Sumberdayatersebar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sumberdayatersebar module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Sumberdayatersebar diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}