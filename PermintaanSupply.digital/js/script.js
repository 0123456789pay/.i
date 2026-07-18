// JavaScript untuk Permintaansupply
document.addEventListener('DOMContentLoaded', function() {
    console.log('Permintaansupply module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Permintaansupply diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}