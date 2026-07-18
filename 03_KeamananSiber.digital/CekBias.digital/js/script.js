// JavaScript untuk Cekbias
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cekbias module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Cekbias diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}