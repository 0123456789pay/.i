// JavaScript untuk Reduksidimensi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reduksidimensi module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Reduksidimensi diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}