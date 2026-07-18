// JavaScript untuk Newsflash24
document.addEventListener('DOMContentLoaded', function() {
    console.log('Newsflash24 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Newsflash24 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}