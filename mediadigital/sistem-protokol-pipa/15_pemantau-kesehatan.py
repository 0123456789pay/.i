# -*- coding: utf-8 -*-
# =====================================================================
# SISTEM PROTOKOL MULTIFUNGSI "|" - PEMANTAU KESEHATAN SISTEM
# Fungsi : Mengukur denyut seluruh jalur input output secara langsung
# =====================================================================

import time


class PemantauKesehatan:
    """Alat ukur kondisi kanal IO: nadi, tunda, dan muatan."""

    def __init__(self):
        self.catatan = []

    def rekam(self, nama_kanal, status="hidup", tunda_ms=0):
        """Rekam satu pengukuran kesehatan sebuah kanal."""
        self.catatan.append({
            "waktu": time.time(),
            "kanal": nama_kanal,
            "status": status,
            "tunda_milidetik": tunda_ms,
        })
        return len(self.catatan)

    def ringkasan(self):
        """Ringkas kondisi terkini semua kanal yang dipantau."""
        if not self.catatan:
            return {"kanal": 0, "keterangan": "belum ada catatan"}
        terbaru = {}
        for item in self.catatan:
            terbaru[item["kanal"]] = item
        hidup = sum(1 for v in terbaru.values() if v["status"] == "hidup")
        return {
            "kanal": len(terbaru),
            "hidup": hidup,
            "mati": len(terbaru) - hidup,
            "rata_tunda_ms": round(
                sum(v["tunda_milidetik"] for v in terbaru.values())
                / max(len(terbaru), 1), 2),
        }

    def sehat(self):
        """Nilai benar bila seluruh kanal terpantau hidup."""
        r = self.ringkasan()
        return r.get("mati", 0) == 0 and r.get("kanal", 0) > 0
