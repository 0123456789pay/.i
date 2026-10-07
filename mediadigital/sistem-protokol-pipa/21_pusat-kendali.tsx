// =====================================================================
// SISTEM PROTOKOL MULTIFUNGSI "|" - PUSAT KENDALI (TSX / REAKSI)
// Fungsi : Panel kendali visual untuk memantau input output sistem
// =====================================================================

import React, { useState, useEffect } from 'react';
import type { PaketProtokol, JenisKanal } from './20_jenis-kanal';

interface ProposisiPusat {
  namaSistem?: string;
  jedaSegarDetik?: number;
}

/** Komponen layar utama pemantau aliran IO protokol '|' */
export function PusatKendali(props: ProposisiPusat) {
  const [daftarPaket, setDaftarPaket] = useState<PaketProtokol[]>([]);
  const [kanalAktif, setKanalAktif] = useState<JenisKanal>('papan-tik');

  useEffect(() => {
    const jam = setInterval(() => {
      setDaftarPaket((lama) => lama.slice(-50)); // simpan maksimal lima puluh
    }, (props.jedaSegarDetik ?? 5) * 1000);
    return () => clearInterval(jam);
  }, [props.jedaSegarDetik]);

  const tambahPaket = (isi: string) => {
    const baru: PaketProtokol = {
      waktu: new Date().toISOString(),
      kanal: kanalAktif,
      isi: isi,
      status: 'menunggu',
    };
    setDaftarPaket((lama) => [...lama, baru]);
  };

  return (
    <div className="panel-kendali">
      <h1>| Pusat Kendali {props.namaSistem ?? 'Protokol'} |</h1>
      <select value={kanalAktif} onChange={(e) => setKanalAktif(e.target.value as JenisKanal)}>
        <option value="papan-tik">Papan Tik</option>
        <option value="berkas">Berkas</option>
        <option value="jaringan">Jaringan</option>
        <option value="sensor">Sensor</option>
      </select>
      <button onClick={() => tambahPaket('paket-percobaan')}>Kirim Masukan</button>
      <ul>{daftarPaket.map((p, i) => (
        <li key={i}>{p.kanal} | {String(p.isi)} | {p.status}</li>
      ))}</ul>
    </div>
  );
}

export default PusatKendali;
