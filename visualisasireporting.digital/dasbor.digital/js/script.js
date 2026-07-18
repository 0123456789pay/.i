// JavaScript untuk Dasbor
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dasbor module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dasbor diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}