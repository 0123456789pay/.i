// JavaScript untuk Syncmate
document.addEventListener('DOMContentLoaded', function() {
    console.log('Syncmate module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Syncmate diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}