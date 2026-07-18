// JavaScript untuk Programafiliasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Programafiliasi module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Programafiliasi diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}