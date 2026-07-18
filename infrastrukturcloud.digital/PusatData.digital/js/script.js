// JavaScript untuk Pusatdata
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pusatdata module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pusatdata diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}