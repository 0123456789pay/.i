// JavaScript untuk Sistemgacha
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistemgacha module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Sistemgacha diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}