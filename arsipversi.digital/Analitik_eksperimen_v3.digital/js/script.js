// JavaScript untuk Analitik Eksperimen V3
document.addEventListener('DOMContentLoaded', function() {
    console.log('Analitik Eksperimen V3 module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Analitik Eksperimen V3 diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}