# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - AMANAT KEAMANAN INPUT OUTPUT
# Fungsi : Memfilter masukan berbahaya dan menyaring keluaran sensitif
# =====================================================================

POLA_BERBAHAYA = ["../", "..\\", "<script", "onerror=", "javascript:"]
POLA_SENSITIF = ["sandian", "kata_laluan", "token", "rahasia"]


class AmanatKeamanan:
    """Penjaga gerbang keamanan pada setiap paket IO protokol '|'."""

    def periksa_masukan(self, teks):
        """Kembalikan daftar pola berbahaya yang ditemukan pada masukan."""
        rendahan = str(teks).lower()
        temuan = [pola for pola in POLA_BERBAHAYA if pola in rendahan]
        return {"aman": len(temuan) == 0, "temuan": temuan}

    def saring_keluaran(self, teks):
        """Tutupi kata sensitif pada keluaran dengan tanda bintang."""
        hasil = str(teks)
        for kata in POLA_SENSITIF:
            hasil = hasil.replace(kata, "*" * len(kata))
        return hasil

    def bersihkan(self, teks):
        """Buang karakter tak perlu dari sebuah masukan mentah."""
        return "".join(c for c in str(teks) if c.isprintable()).strip()
