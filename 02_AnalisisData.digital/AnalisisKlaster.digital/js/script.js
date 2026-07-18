// JavaScript untuk Analisisklaster
document.addEventListener('DOMContentLoaded', function() {
    console.log('Analisisklaster module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Analisisklaster diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}