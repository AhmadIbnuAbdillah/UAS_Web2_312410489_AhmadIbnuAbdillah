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
>  **[Lampirkan screenshot skema relasi tabel dari Database Designer phpMyAdmin di sini]**

Struktur tabel:
- `users` — data akun admin (username, password, auth_token)
- `kategori` — jenis/kategori mobil
- `supplier` — data pemasok mobil
- `mobil` — data utama mobil (foreign key ke `kategori` dan `supplier`)

---

## Uji Coba Proteksi Token (Error 401)
> **[Lampirkan screenshot uji coba request POST/PUT/DELETE tanpa token via Postman yang menghasilkan response Error 401 Unauthorized]**

---

## Tampilan Antarmuka Aplikasi
> **[Lampirkan screenshot: halaman Login, halaman Dashboard Admin, modal Tambah/Edit Data, dan tabel data bertenaga TailwindCSS]**

---

## Link Demo & Video Presentasi
- Link Video Presentasi YouTube: *(isi link YouTube di sini)*

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
