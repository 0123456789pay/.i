// JavaScript untuk Desktopweb
document.addEventListener('DOMContentLoaded', function() {
    console.log('Desktopweb module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Desktopweb diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}