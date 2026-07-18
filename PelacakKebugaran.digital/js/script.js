// JavaScript untuk Pelacakkebugaran
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pelacakkebugaran module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pelacakkebugaran diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}