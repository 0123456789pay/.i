# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PELAPOR LOG KEGIATAN
# Fungsi : Mencatat setiap kejadian input output ke buku catatan sistem
# =====================================================================

import datetime


TINGKAT_LOG = {
    "info": "berita",
    "warn": "peringatan",
    "error": "galat",
    "debug": "urut_sakit",
}


class PelaporLog:
    """Pencatat riwayat kegiatan IO dengan label tingkat berbahasa Indonesia."""

    def __init__(self, batas=500):
        self.buku = []
        self.batas = batas

    def catat(self, pesan, tingkat="info"):
        """Tulis satu baris catatan baru beserta cap waktu."""
        cap = datetime.datetime.now().isoformat(timespec="seconds")
        entri = {
            "waktu": cap,
            "tingkat": TINGKAT_LOG.get(tingkat, tingkat),
            "pesan": str(pesan),
        }
        self.buku.append(entri)
        if len(self.buku) > self.batas:
            self.buku.pop(0)
        return entri

    def berita(self, pesan):
        return self.catat(pesan, "info")

    def galat(self, pesan):
        return self.catat(pesan, "error")

    def cari(self, kata):
        """Cari catatan yang memuat sebuah kata kunci."""
        return [e for e in self.buku if kata.lower() in e["pesan"].lower()]

    def salin_buku(self):
        """Keluarkan seluruh isi buku catatan sebagai teks rapi."""
        return "\n".join("[{waktu}] ({tingkat}) {pesan}".format(**e)
                         for e in self.buku)
