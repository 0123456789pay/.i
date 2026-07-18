// JavaScript untuk Newsdigital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Newsdigital module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Newsdigital diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}