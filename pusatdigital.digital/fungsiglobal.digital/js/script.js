// JavaScript untuk Fungsiglobal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fungsiglobal module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Fungsiglobal diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}