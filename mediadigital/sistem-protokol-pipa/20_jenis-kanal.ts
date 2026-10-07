// =====================================================================
// SISTEM PROTOKOL MULTIFUNGSI "|" - JENIS KANAL (TYPESCRIPT)
// Fungsi : Mendefinisikan tipe data seluruh jalur input output
// =====================================================================

/** Jenis kanal masukan yang dikenali protokol */
export type JenisKanal = 'papan-tik' | 'berkas' | 'jaringan' | 'sensor';

/** Status sebuah paket data dalam aliran */
export type StatusPaket = 'menunggu' | 'diproses' | 'selesai' | 'gagal';

/** Bentuk satu paket input output standar protokol */
export interface PaketProtokol {
  readonly waktu: string;
  readonly kanal: JenisKanal;
  readonly isi: unknown;
  status: StatusPaket;
}

/** Kontrak kerja antarmuka masukan/keluaran */
export interface AntarmukaIO {
  terima(paket: PaketProtokol): boolean;
  kirim(): PaketProtokol[];
  tutup(): void;
}

/** Tetapan global protokol */
export const TETAPAN_KANAL: Record<JenisKanal, number> = {
  'papan-tik': 1,
  'berkas': 2,
  'jaringan': 3,
  'sensor': 4,
};
