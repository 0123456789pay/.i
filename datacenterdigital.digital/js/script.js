// JavaScript untuk Datacenterdigital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Datacenterdigital module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Datacenterdigital diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}