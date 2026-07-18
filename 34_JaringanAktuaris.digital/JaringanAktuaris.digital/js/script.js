// JavaScript untuk Jaringanaktuaris
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jaringanaktuaris module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Jaringanaktuaris diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}