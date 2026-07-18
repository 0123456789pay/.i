// JavaScript untuk Penjelasanai
document.addEventListener('DOMContentLoaded', function() {
    console.log('Penjelasanai module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Penjelasanai diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}