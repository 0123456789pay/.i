# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PEMBATAS LAJU INPUT OUTPUT
# Fungsi : Mengatur kecepatan aliran data agar sistem tidak kewalahan
# =====================================================================

import time


class PembatasLaju:
    """Pengendali laju paket IO per rentang waktu tertentu."""

    def __init__(self, maksimum=100, jendela_detik=1.0):
        self.maksimum = maksimum
        self.jendela = jendela_detik
        self.jejak = []

    def boleh_lewat(self):
        """Nilai True bila kuota paket dalam jendela waktu masih ada."""
        sekarang = time.time()
        self.jejak = [t for t in self.jejak if sekarang - t < self.jendela]
        if len(self.jejak) < self.maksimum:
            self.jejak.append(sekarang)
            return True
        return False

    def tunggu(self):
        """Blokir sampai kuota paket berikutnya tersedia."""
        while not self.boleh_lewat():
            time.sleep(self.jendela / max(self.maksimum, 1))

    def sisa_kuota(self):
        """Hitung paket yang masih boleh dikirim saat ini."""
        sekarang = time.time()
        aktif = [t for t in self.jejak if sekarang - t < self.jendela]
        return max(self.maksimum - len(aktif), 0)
