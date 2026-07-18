// JavaScript untuk Fiturdigital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fiturdigital module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Fiturdigital diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}