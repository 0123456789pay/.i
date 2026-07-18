// JavaScript untuk Penyesuaiklaim
document.addEventListener('DOMContentLoaded', function() {
    console.log('Penyesuaiklaim module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Penyesuaiklaim diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}