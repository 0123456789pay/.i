# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - ANTAR MUKA OUTPUT
# Fungsi : Menangani SEMUA jalur keluaran (layar, berkas, log, jaringan)
# =====================================================================

import json
import sys


class AntarmukaOutput:
    """Gerbang keluaran tunggal untuk seluruh sistem output."""

    def __init__(self, stream=sys.stdout):
        self.stream = stream
        self.riwayat = []

    def kirim(self, data):
        """Kirim satu paket keluaran ke layar dan simpan ke riwayat."""
        teks = self._format(data)
        self.riwayat.append(teks)
        print(teks, file=self.stream)
        return teks

    def tulis_berkas(self, jalur_berkas, isi):
        """Tulis keluaran ke sebuah berkas teks."""
        with open(jalur_berkas, "w", encoding="utf-8") as f:
            f.write(str(isi))
        return True

    def kirim_json(self, data):
        """Keluaran berformat JSON siap pakai antar modul."""
        return json.dumps(data, ensure_ascii=False, indent=2)

    def _format(self, data):
        if isinstance(data, dict):
            return self.kirim_json(data)
        return str(data)

    def tutup(self):
        """Akhiri seluruh penulisan keluaran."""
        try:
            self.stream.flush()
        except (ValueError, OSError):
            pass
