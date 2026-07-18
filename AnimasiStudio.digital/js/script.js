// JavaScript untuk Animasistudio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Animasistudio module loaded');
    
    // Inisialisasi komponen
    initComponents();
});

function initComponents() {
    // Kode inisialisasi di sini
    console.log('Komponen Animasistudio diinisialisasi');
}

function loadData() {
    // Fungsi untuk memuat data
    return fetch('../api/data')
        .then(response => response.json());
}