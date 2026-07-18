// JavaScript untuk Aitepi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aitepi module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Aitepi diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}