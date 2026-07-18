// JavaScript untuk Teknologikesehatan
document.addEventListener('DOMContentLoaded', function() {
    console.log('Teknologikesehatan module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Teknologikesehatan diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}