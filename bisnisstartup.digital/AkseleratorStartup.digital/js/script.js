// JavaScript untuk Akseleratorstartup
document.addEventListener('DOMContentLoaded', function() {
    console.log('Akseleratorstartup module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Akseleratorstartup diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}