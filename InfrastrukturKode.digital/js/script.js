// JavaScript untuk Infrastrukturkode
document.addEventListener('DOMContentLoaded', function() {
    console.log('Infrastrukturkode module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Infrastrukturkode diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}