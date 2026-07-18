// JavaScript untuk Blogpengalaman
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blogpengalaman module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Blogpengalaman diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}