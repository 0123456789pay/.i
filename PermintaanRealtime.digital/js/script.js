// JavaScript untuk Permintaanrealtime
document.addEventListener('DOMContentLoaded', function() {
    console.log('Permintaanrealtime module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Permintaanrealtime diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}