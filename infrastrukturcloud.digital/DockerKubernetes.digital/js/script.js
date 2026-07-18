// JavaScript untuk Dockerkubernetes
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dockerkubernetes module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Dockerkubernetes diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}