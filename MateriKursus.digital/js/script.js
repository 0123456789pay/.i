// JavaScript untuk Materikursus
document.addEventListener('DOMContentLoaded', function() {
    console.log('Materikursus module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Materikursus diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}