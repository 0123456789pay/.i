# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PENYANDIAN TEKS
# Fungsi : Mengubah simbol, angka, dan huruf A-Z menjadi istilah Indonesia
# =====================================================================

SIMBOL_NAMA = {
    "|": "pipa",
    "+": "tambah",
    "-": "kurang",
    "*": "kali",
    "/": "bagi",
    "=": "sama dengan",
    "<": "lebih kecil",
    ">": "lebih besar",
    "!": "seru",
    "?": "tanya",
    "@": "at",
    "#": "pagar",
    "$": "dolar",
    "%": "persen",
    "&": "dan",
    "_": "garis bawah",
    ":": "titik dua",
    ";": "titik koma",
    ",": "koma",
    ".": "titik",
}

ANGKA_NAMA = {
    0: "nol", 1: "satu", 2: "dua", 3: "tiga", 4: "empat",
    5: "lima", 6: "enam", 7: "tujuh", 8: "delapan", 9: "sembilan",
}

HURUF_NAMA = {chr(ord("a") + i): nama for i, nama in enumerate([
    "anna", "berta", "cesar", "dedi", "emil", "ferry", "gina", "hari",
    "inda", "joko", "karta", "liga", "mario", "nada", "otto", "pipo",
    "qori", "raja", "sari", "tono", "urcha", "vina", "wira", "xaver",
    "yusuf", "zainal",
])}


class PenyandiTeks:
    """Penyandar karakter IO agar seluruh tulisan memakai Bahasa Indonesia."""

    def sandikan(self, teks):
        """Kembalikan teks yang simbol/angka/hurufnya sudah dinamai."""
        hasil = []
        for karakter in str(teks):
            if karakter.lower() in SIMBOL_NAMA:
                hasil.append(SIMBOL_NAMA[karakter.lower()])
            elif karakter.isdigit() and int(karakter) in ANGKA_NAMA:
                hasil.append(ANGKA_NAMA[int(karakter)])
            elif karakter.isalpha():
                hasil.append(HURUF_NAMA.get(karakter.lower(), karakter))
            else:
                hasil.append(karakter)
        return " ".join(hasil)

    def pulihkan(self, teks_sandi):
        """Ubah kembali teks sandi menjadi teks asal (bolak-balik)."""
        balik_simbol = {v: k for k, v in SIMBOL_NAMA.items()}
        balik_angka = {v: str(k) for k, v in ANGKA_NAMA.items()}
        balik_huruf = {v: k for k, v in HURUF_NAMA.items()}
        kata = teks_sandi.split()
        return "".join(balik_simbol.get(w, balik_angka.get(w, balik_huruf.get(w, w)))
                       for w in kata)
