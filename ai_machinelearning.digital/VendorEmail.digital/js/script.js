// JavaScript untuk Vendoremail
document.addEventListener('DOMContentLoaded', function() {
    console.log('Vendoremail module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Vendoremail diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}