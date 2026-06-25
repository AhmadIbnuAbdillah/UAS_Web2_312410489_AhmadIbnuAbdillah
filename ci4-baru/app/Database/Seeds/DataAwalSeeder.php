<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class DataAwalSeeder extends Seeder
{
    public function run()
    {
        // Kategori contoh
        $kategori = [
            ['nama_kategori' => 'SUV', 'deskripsi' => 'Sport Utility Vehicle, bertenaga besar dan tinggi', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nama_kategori' => 'MPV', 'deskripsi' => 'Multi Purpose Vehicle, mobil keluarga', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nama_kategori' => 'Sedan', 'deskripsi' => 'Mobil sedan untuk kenyamanan berkendara', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nama_kategori' => 'Hatchback', 'deskripsi' => 'Mobil kompak perkotaan', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ];
        $this->db->table('kategori')->insertBatch($kategori);

        // Supplier contoh
        $supplier = [
            ['nama_supplier' => 'PT Astra Daihatsu Motor', 'alamat' => 'Jakarta Utara', 'no_telepon' => '021-12345678', 'email' => 'sales@adm.co.id', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nama_supplier' => 'PT Toyota Astra Motor', 'alamat' => 'Jakarta Timur', 'no_telepon' => '021-87654321', 'email' => 'sales@tam.co.id', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nama_supplier' => 'PT Honda Prospect Motor', 'alamat' => 'Karawang', 'no_telepon' => '0267-998877', 'email' => 'sales@hpm.co.id', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ];
        $this->db->table('supplier')->insertBatch($supplier);

        // Mobil contoh
        $mobil = [
            ['kategori_id' => 1, 'supplier_id' => 1, 'nama_mobil' => 'Terios', 'merek' => 'Daihatsu', 'tahun_produksi' => 2024, 'warna' => 'Putih', 'no_plat' => 'B 1234 ABC', 'harga' => 285000000, 'stok' => 5, 'status' => 'tersedia', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['kategori_id' => 2, 'supplier_id' => 2, 'nama_mobil' => 'Avanza', 'merek' => 'Toyota', 'tahun_produksi' => 2023, 'warna' => 'Silver', 'no_plat' => 'B 5678 DEF', 'harga' => 250000000, 'stok' => 8, 'status' => 'tersedia', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['kategori_id' => 3, 'supplier_id' => 3, 'nama_mobil' => 'Civic', 'merek' => 'Honda', 'tahun_produksi' => 2024, 'warna' => 'Hitam', 'no_plat' => 'B 9999 GHI', 'harga' => 550000000, 'stok' => 2, 'status' => 'tersedia', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ];
        $this->db->table('mobil')->insertBatch($mobil);
    }
}
