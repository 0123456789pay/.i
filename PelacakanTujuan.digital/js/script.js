// JavaScript untuk Pelacakantujuan
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pelacakantujuan module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Pelacakantujuan diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}