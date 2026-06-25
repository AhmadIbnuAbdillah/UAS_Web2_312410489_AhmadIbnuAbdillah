## Identitas Mahasiswa
- Nama: Ahmad Ibnu Abdillah
- NIM: 312410489
- Kelas: I241E
- Mata Kuliah: Pemrograman Web 2


# E-Inventory Mobil Sistem Manajemen Inventaris Kendaraan

## Deskripsi Proyek
Proyek ini merupakan Tugas Ujian Akhir Semester (UAS) Mata Kuliah **Pemrograman Web 2**.
Tema studi kasus yang dipilih adalah **Sistem Manajemen Inventaris Barang (E-Inventory)**,
diimplementasikan untuk mengelola data **inventaris mobil**, meliputi:
- Data mobil (nama, merek, tahun produksi, warna, no. plat, harga, stok, status)
- Kategori/jenis mobil (SUV, MPV, Sedan, Hatchback, dll)
- Data supplier/pemasok mobil

Aplikasi dibangun dengan **Decoupled Architecture**: backend (REST API) dan frontend (SPA)
benar-benar terpisah dan saling berkomunikasi melalui HTTP request berformat JSON.

---

## Teknologi yang Digunakan
| Komponen        | Teknologi                                  |
|-----------------|---------------------------------------------|
| Backend         | PHP CodeIgniter 4 (Resource Controller, REST API) |
| Frontend        | Vue JS 3 + Vue Router (CDN, SPA)            |
| UI Framework    | TailwindCSS (CDN)                           |
| HTTP Client     | Axios (Request & Response Interceptor)      |
| Database        | MySQL / MariaDB                             |

---

## Skema Relasi Tabel Database
![img](https://github.com/AhmadIbnuAbdillah/img-uas/blob/6729f77f060e13ab0e1be15fc14632b18b7c418c/Screenshot%202026-06-25%20000234.png)

Struktur tabel:
- `users` — data akun admin (username, password, auth_token)
- `kategori` — jenis/kategori mobil
- `supplier` — data pemasok mobil
- `mobil` — data utama mobil (foreign key ke `kategori` dan `supplier`)

---

## Uji Coba Proteksi Token (Error 401)
![img](https://github.com/AhmadIbnuAbdillah/img-uas/blob/62d5c0cbe3caefac5e93c16ba1d0f9bb0b1c9054/Screenshot%202026-06-25%20192242.png)

---

## Tampilan Antarmuka Aplikasi
![img](https://github.com/AhmadIbnuAbdillah/img-uas/blob/6729f77f060e13ab0e1be15fc14632b18b7c418c/Screenshot%202026-06-25%20190311.png)
![img](https://github.com/AhmadIbnuAbdillah/img-uas/blob/6729f77f060e13ab0e1be15fc14632b18b7c418c/Screenshot%202026-06-25%20190321.png)
![img](https://github.com/AhmadIbnuAbdillah/img-uas/blob/6729f77f060e13ab0e1be15fc14632b18b7c418c/Screenshot%202026-06-25%20190326.png)

---

## Link Demo & Video Presentasi
- Link Video Presentasi YouTube: (https://youtu.be/MpBB1tPi78g?si=Lfxu38nat-5GNzf6)

---

## 📂 Struktur Folder Repositori
```
UAS_Web2_NIM_Nama/
├── backend-api/        # CodeIgniter 4 - REST API
│   ├── app/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Filters/
│   │   └── Database/
│   │       ├── Migrations/
│   │       └── Seeds/
│   └── env
└── frontend-spa/        # Vue 3 SPA
    ├── components/
    ├── router/
    ├── js/
    ├── app.js
    └── index.html
```

---

## Hak Akses Pengguna
| Role                | Akses                                                        |
|---------------------|---------------------------------------------------------------|
| Administrator       | Dashboard, CRUD Mobil/Kategori/Supplier, Logout (wajib login) |
