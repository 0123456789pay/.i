// JavaScript untuk Keanekaragamanhayati
document.addEventListener('DOMContentLoaded', function() {
    console.log('Keanekaragamanhayati module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Keanekaragamanhayati diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}