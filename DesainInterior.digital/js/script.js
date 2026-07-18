// JavaScript untuk Desaininterior
document.addEventListener('DOMContentLoaded', function() {
    console.log('Desaininterior module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Desaininterior diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}