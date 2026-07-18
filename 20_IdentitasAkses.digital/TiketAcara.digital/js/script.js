// JavaScript untuk Tiketacara
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tiketacara module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Tiketacara diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}