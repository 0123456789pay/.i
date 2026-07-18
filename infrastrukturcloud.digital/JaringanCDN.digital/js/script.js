// JavaScript untuk Jaringancdn
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jaringancdn module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Jaringancdn diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}