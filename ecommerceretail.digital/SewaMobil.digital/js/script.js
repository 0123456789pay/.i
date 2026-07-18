// JavaScript untuk Sewamobil
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sewamobil module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Sewamobil diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}