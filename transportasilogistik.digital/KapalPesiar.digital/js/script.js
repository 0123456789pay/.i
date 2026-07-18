// JavaScript untuk Kapalpesiar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kapalpesiar module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Kapalpesiar diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}