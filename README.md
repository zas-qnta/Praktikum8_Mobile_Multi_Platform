# 📱 Diary App - Praktikum 8 Mobile Multi Platform

Aplikasi catatan harian (Personal Diary) berbasis React Native & Expo dengan manajemen state menggunakan Redux Toolkit.

## 👤 Identitas Mahasiswa
- **Nama:** Zaskia Qanita Najiyah
- **NIM:** 2430511024
- **Program Studi:** Teknik Informatika - Universitas Muhammadiyah Sukabumi (UMMI)
- **Mata Kuliah:** Mobile Multi Platform (Praktikum 8)

## ✨ Fitur Utama
- **Manajemen Catatan (CRUD):** Membuat, melihat detail, mengedit, dan menghapus catatan harian.
- **Mood Tagging:** Menambahkan penanda suasana hati pada setiap entri catatan.
- **Favorit:** Menandai dan memfilter catatan favorit.
- **State Management:** Menggunakan Redux Toolkit (`diarySlice`) untuk pengelolaan data global yang terpusat.

## 🛠️ Teknologi yang Digunakan
- React Native & Expo Router
- TypeScript
- Redux Toolkit & React-Redux

## 🧠 Konsep State & Penyimpanan Data
1. **Local State (`useState`):** Digunakan pada form input (seperti judul, isi, dan mood) karena sifatnya lokal pada satu screen dan akan ter-reset saat screen ditutup.
2. **Global Redux State (Redux Toolkit):** Digunakan untuk menyimpan daftar entri catatan dan status favorit agar dapat diakses lintas screen secara sinkron. Bersifat *in-memory* dan akan kembali ke *initial state* jika aplikasi direstart.
3. **Persistent Database:** Media penyimpanan permanen di sisi server atau local storage perangkat (seperti SQLite, MySQL, atau REST API backend) yang menjaga data tetap aman meski aplikasi ditutup.

## 🚀 Cara Menjalankan Project
1. Install dependencies: `npm install`
2. Jalankan aplikasi: `npx expo start`