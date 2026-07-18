// JavaScript untuk Ansiblechef
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ansiblechef module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Ansiblechef diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}