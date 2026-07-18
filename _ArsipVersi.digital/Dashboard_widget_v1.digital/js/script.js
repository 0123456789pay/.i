// JavaScript untuk Dashboard Widget V1
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Widget V1 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dashboard Widget V1 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}