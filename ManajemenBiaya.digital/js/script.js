// JavaScript untuk Manajemenbiaya
document.addEventListener('DOMContentLoaded', function() {
    console.log('Manajemenbiaya module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Manajemenbiaya diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}