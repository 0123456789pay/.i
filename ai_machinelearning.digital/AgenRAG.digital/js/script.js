// JavaScript untuk Agenrag
document.addEventListener('DOMContentLoaded', function() {
    console.log('Agenrag module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Agenrag diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}