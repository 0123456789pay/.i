// JavaScript untuk Tagihanperjam
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tagihanperjam module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Tagihanperjam diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}