// JavaScript untuk Mediadigitalpusatiklan
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mediadigitalpusatiklan module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Mediadigitalpusatiklan diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}