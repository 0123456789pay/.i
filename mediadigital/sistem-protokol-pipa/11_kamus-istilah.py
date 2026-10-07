# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - KAMUS ISTILAH KODE
# Fungsi : Peta terjemahan seluruh istilah pemrograman ke Bahasa Indonesia
# =====================================================================

TERJEMAHAN_KODE = {
    # Perintah dasar input output
    "read": "baca",
    "write": "tulis",
    "print": "tampil",
    "input": "masukan",
    "output": "keluaran",
    "open": "buka",
    "close": "tutup",
    "save": "simpan",
    "load": "muat",
    "send": "kirim",
    "receive": "terima",
    "download": "unduh",
    "upload": "unggah",
    "log": "catat",
    # Struktur bahasa pemrograman
    "if": "jika",
    "else": "selain_itu",
    "for": "untuk",
    "while": "selama",
    "def": "fungsi",
    "class": "kelas",
    "return": "kembalikan",
    "import": "impor",
    "const": "tetapan",
    "let": "biarlah",
    "var": "variabel",
    "true": "benar",
    "false": "salah",
    "null": "nihil",
    "undefined": "tak_terdefinisi",
    # Komponen web
    "header": "kepala",
    "footer": "kaki",
    "body": "badan",
    "title": "judul",
    "button": "tombol",
    "form": "borang",
    "image": "gambar",
    "link": "tautan",
    "page": "halaman",
    "file": "berkas",
    "folder": "direktori",
    "search": "cari",
    "user": "pengguna",
    "password": "sandian",
    "login": "masuk",
    "register": "daftar",
}


def istilah_inggris_ke_indonesia(teks):
    """Terjemahkan satu kata istilah Inggris bila ada di kamus."""
    return TERJEMAHAN_KODE.get(str(teks).lower(), teks)


def istilah_indonesia_ke_inggris(teks):
    """Arah balik: cari istilah Inggris dari padanan Indonesia."""
    balik = {v: k for k, v in TERJEMAHAN_KODE.items()}
    return balik.get(teks, teks)
