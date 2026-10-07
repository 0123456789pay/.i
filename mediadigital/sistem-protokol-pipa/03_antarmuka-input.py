# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - ANTAR MUKA INPUT
# Fungsi : Menangani SEMUA jalur masukan (papan tik, berkas, jaringan)
# =====================================================================

import sys


class AntarmukaInput:
    """Gerbang masukan tunggal untuk seluruh sistem input."""

    def __init__(self):
        self.antrian = []
        self.sumur_log = []

    def terima(self, nama_perintah, *argumen):
        """Terima satu paket masukan lalu kemas menjadi permintaan."""
        permintaan = {
            "perintah": nama_perintah,
            "argumen": list(argumen),
            "sumber": "pengguna",
        }
        self.antrian.append(permintaan)
        self.sumur_log.append(permintaan)
        return permintaan

    def baca_baris(self):
        """Baca satu baris dari standar input (masukan papan tik)."""
        try:
            baris = sys.stdin.readline().rstrip("\n")
        except (EOFError, KeyboardInterrupt):
            baris = ""
        return baris

    def baca_berkas(self, jalur_berkas):
        """Baca isi sebuah berkas sebagai masukan teks."""
        with open(jalur_berkas, "r", encoding="utf-8") as f:
            return f.read()

    def tutup(self):
        """Bersihkan antrian masukan saat sesi berakhir."""
        self.antrian.clear()
