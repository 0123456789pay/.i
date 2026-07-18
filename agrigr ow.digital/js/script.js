// JavaScript untuk Agrigr Ow
document.addEventListener('DOMContentLoaded', function() {
    console.log('Agrigr Ow module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Agrigr Ow diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}