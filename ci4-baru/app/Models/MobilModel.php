<?php

namespace App\Models;

use CodeIgniter\Model;

class MobilModel extends Model
{
    protected $table         = 'mobil';
    protected $primaryKey    = 'id';
    protected $allowedFields = [
        'kategori_id', 'supplier_id', 'nama_mobil', 'merek',
        'tahun_produksi', 'warna', 'no_plat', 'harga',
        'stok', 'status', 'gambar',
    ];
    protected $useTimestamps = true;
    protected $returnType    = 'array';

    // Validasi dasar
    protected $validationRules = [
        'nama_mobil'      => 'required|min_length[2]|max_length[150]',
        'merek'           => 'required|max_length[100]',
        'tahun_produksi'  => 'required|numeric',
        'kategori_id'     => 'required|numeric',
        'supplier_id'     => 'required|numeric',
    ];

    /**
     * Ambil semua data mobil lengkap dengan nama kategori & supplier (JOIN)
     */
    public function getAllWithRelasi()
    {
        return $this->select('mobil.*, kategori.nama_kategori, supplier.nama_supplier')
            ->join('kategori', 'kategori.id = mobil.kategori_id')
            ->join('supplier', 'supplier.id = mobil.supplier_id')
            ->orderBy('mobil.id', 'DESC')
            ->findAll();
    }

    /**
     * Ambil satu data mobil lengkap dengan relasi berdasarkan ID
     */
    public function getOneWithRelasi($id)
    {
        return $this->select('mobil.*, kategori.nama_kategori, supplier.nama_supplier')
            ->join('kategori', 'kategori.id = mobil.kategori_id')
            ->join('supplier', 'supplier.id = mobil.supplier_id')
            ->where('mobil.id', $id)
            ->first();
    }
}
