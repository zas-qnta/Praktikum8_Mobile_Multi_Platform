# Diary App 8 - Redux Toolkit pada React Native

Aplikasi buku harian sederhana yang dibuat untuk Praktikum 08 Mobile Programming.
Fokus praktikum ini adalah pengelolaan global state dengan Redux Toolkit
menggunakan Expo Router. Belum ada backend, REST API, maupun database.

## Fitur

- Melihat daftar diary beserta statistik Total Diary dan Total Favorite
- Filter diary berdasarkan mood pada halaman Home
- Menambah diary (judul minimal 3 karakter, isi wajib diisi)
- Mengedit diary (judul, isi, dan mood)
- Menandai diary sebagai favorite dan menghapus semua favorite sekaligus
- Menghapus diary dan mengembalikan seluruh data ke kondisi awal (reset)
- Tampilan kosong (empty state) yang menjelaskan langkah selanjutnya

## Cara Menjalankan

```
npm install
npx expo start
```

## Struktur Folder

```
app/                  route Expo Router
  (tabs)/             Home, Tambah, Favorite
  detail/[id].tsx     detail diary
  edit/[id].tsx       edit diary
src/
  store/              store.ts dan hooks.ts (typed hooks)
  features/diary/     diarySlice.ts (state dan reducer)
  components/         DiaryCard.tsx
  constants/          moods.ts
  styles/             tokens.ts
```

Catatan: store dan hooks ditempatkan di `src/store`, bukan `src/app`, karena
Expo Router menganggap `src/app` sebagai folder route.

## Perbedaan Local State, Global Redux State, dan Persistent Database

### 1. Local state (useState)

Data yang hanya dibutuhkan oleh satu komponen atau satu screen. Contoh di
aplikasi ini: isi TextInput pada form Tambah dan Edit, serta pilihan filter
mood di Home. Data ini hilang ketika komponennya ditutup (unmount) dan tidak
perlu dibagikan ke screen lain, jadi tidak perlu dimasukkan ke Redux.

### 2. Global state (Redux Toolkit)

Data yang dipakai oleh banyak screen dan perubahannya perlu konsisten. Contoh:
daftar diary dan status favorite. Data disimpan di satu Store, dibaca dengan
`useAppSelector`, dan diubah lewat `dispatch(action)` yang diproses reducer.
Karena semua screen membaca sumber yang sama, perubahan di satu screen langsung
terlihat di screen lain. Namun Redux Store hanya berada di memori aplikasi,
sehingga data kembali ke `initialState` ketika aplikasi di-restart atau
di-reload.

### 3. Persistent database

Tempat penyimpanan permanen di luar memori aplikasi, misalnya MySQL yang diakses
melalui REST API. Data tetap ada walaupun aplikasi ditutup dan dapat diakses
dari perangkat lain. Pada modul ini database belum digunakan. Pada pertemuan
berikutnya, Redux akan berperan sebagai state di sisi client, sedangkan
database menjadi penyimpanan utamanya.

| Aspek | Local state | Global Redux state | Persistent database |
| --- | --- | --- | --- |
| Lokasi data | Memori komponen | Memori aplikasi (Store) | Server / disk |
| Cakupan | Satu komponen/screen | Seluruh aplikasi | Seluruh pengguna dan perangkat |
| Bertahan setelah restart | Tidak | Tidak | Ya |
| Contoh di proyek ini | Isi form, filter mood | Daftar diary, favorite | Belum digunakan |