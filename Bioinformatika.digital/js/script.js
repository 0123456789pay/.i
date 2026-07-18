// JavaScript untuk Bioinformatika
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bioinformatika module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Bioinformatika diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}