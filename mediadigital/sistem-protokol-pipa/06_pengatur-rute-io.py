# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PENGATUR RUTE INPUT OUTPUT
# Fungsi : Memetakan setiap perintah ke jalur masukan/keluaran tepat
# =====================================================================

from kamus_istilah import TERJEMAHAN_KODE


class PengaturRute:
    """Penentu arah trafik IO pada protokol '|'."""

    def __init__(self):
        self.peta_rute = {
            "baca": "jalur-berkas",
            "tulis": "jalur-berkas",
            "tampil": "jalur-layar",
            "unduh": "jalur-jaringan",
            "unggah": "jalur-jaringan",
            "log": "jalur-catatan",
            "bantuan": "jalur-layar",
        }

    def tentukan(self, nama_perintah):
        """Kembalikan nama jalur untuk sebuah perintah."""
        return self.peta_rute.get(nama_perintah, "jalur-layar")

    def daftar_rute(self):
        """Senarai lengkap rute beserta istilah Indonesianya."""
        hasil = {}
        for rute, jalur in self.peta_rute.items():
            hasil[TERJEMAHAN_KODE.get(rute, rute)] = jalur
        return hasil
