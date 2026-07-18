// JavaScript untuk Obligasihijau
document.addEventListener('DOMContentLoaded', function() {
    console.log('Obligasihijau module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Obligasihijau diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}