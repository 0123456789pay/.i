// JavaScript untuk Platformiot
document.addEventListener('DOMContentLoaded', function() {
    console.log('Platformiot module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Platformiot diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}