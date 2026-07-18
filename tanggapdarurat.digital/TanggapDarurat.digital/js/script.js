// JavaScript untuk Tanggapdarurat
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tanggapdarurat module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Tanggapdarurat diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}