// JavaScript untuk Aksestidakaman
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aksestidakaman module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Aksestidakaman diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}