// JavaScript untuk Sertifikasiprofesi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sertifikasiprofesi module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Sertifikasiprofesi diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}