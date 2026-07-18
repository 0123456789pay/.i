// JavaScript untuk Aistudiodigital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aistudiodigital module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Aistudiodigital diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}