// JavaScript untuk Desaingrafis
document.addEventListener('DOMContentLoaded', function() {
    console.log('Desaingrafis module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Desaingrafis diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}