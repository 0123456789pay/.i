// JavaScript untuk Controlproxy
document.addEventListener('DOMContentLoaded', function() {
    console.log('Controlproxy module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Controlproxy diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}