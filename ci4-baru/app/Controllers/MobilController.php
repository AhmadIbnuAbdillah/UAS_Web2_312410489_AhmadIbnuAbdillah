<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\MobilModel;

class MobilController extends ResourceController
{
    protected $modelName = MobilModel::class;
    protected $format     = 'json';

    // GET /api/mobil  -> semua data mobil + nama kategori & supplier (JOIN)
    public function index()
    {
        $data = $this->model->getAllWithRelasi();
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    // GET /api/mobil/{id}
    public function show($id = null)
    {
        $data = $this->model->getOneWithRelasi($id);
        if (!$data) {
            return $this->failNotFound('Data mobil tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    // POST /api/mobil
    public function create()
    {
        $input = $this->request->getJSON(true) ?? $this->request->getPost();

        $rules = [
            'nama_mobil'     => 'required|min_length[2]|max_length[150]',
            'merek'          => 'required|max_length[100]',
            'tahun_produksi' => 'required|numeric',
            'kategori_id'    => 'required|numeric',
            'supplier_id'    => 'required|numeric',
        ];

        if (!$this->validateData($input, $rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'kategori_id'     => $input['kategori_id'],
            'supplier_id'     => $input['supplier_id'],
            'nama_mobil'      => $input['nama_mobil'],
            'merek'           => $input['merek'],
            'tahun_produksi'  => $input['tahun_produksi'],
            'warna'           => $input['warna'] ?? null,
            'no_plat'         => $input['no_plat'] ?? null,
            'harga'           => $input['harga'] ?? 0,
            'stok'            => $input['stok'] ?? 0,
            'status'          => $input['status'] ?? 'tersedia',
            'gambar'          => $input['gambar'] ?? null,
        ]);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Data mobil berhasil ditambahkan.',
            'data'    => $this->model->getOneWithRelasi($id),
        ]);
    }

    // PUT/PATCH /api/mobil/{id}
    public function update($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Data mobil tidak ditemukan.');
        }

        $input = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $this->model->update($id, [
            'kategori_id'     => $input['kategori_id'] ?? $data['kategori_id'],
            'supplier_id'     => $input['supplier_id'] ?? $data['supplier_id'],
            'nama_mobil'      => $input['nama_mobil'] ?? $data['nama_mobil'],
            'merek'           => $input['merek'] ?? $data['merek'],
            'tahun_produksi'  => $input['tahun_produksi'] ?? $data['tahun_produksi'],
            'warna'           => $input['warna'] ?? $data['warna'],
            'no_plat'         => $input['no_plat'] ?? $data['no_plat'],
            'harga'           => $input['harga'] ?? $data['harga'],
            'stok'            => $input['stok'] ?? $data['stok'],
            'status'          => $input['status'] ?? $data['status'],
            'gambar'          => $input['gambar'] ?? $data['gambar'],
        ]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Data mobil berhasil diperbarui.',
            'data'    => $this->model->getOneWithRelasi($id),
        ], 200);
    }

    // DELETE /api/mobil/{id}
    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Data mobil tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Data mobil berhasil dihapus.',
        ]);
    }

    // GET /api/mobil/summary -> ringkasan total data untuk landing page publik
    public function summary()
    {
        $totalMobil    = $this->model->countAll();
        $totalStok     = array_sum(array_column($this->model->findAll(), 'stok'));
        $totalTersedia = $this->model->where('status', 'tersedia')->countAllResults();
        $totalTerjual  = $this->model->where('status', 'terjual')->countAllResults();

        return $this->respond([
            'status' => 200,
            'data'   => [
                'total_mobil'    => $totalMobil,
                'total_stok'     => $totalStok,
                'total_tersedia' => $totalTersedia,
                'total_terjual'  => $totalTerjual,
            ],
        ], 200);
    }

    // POST /api/upload -> upload gambar mobil ke server
    public function upload()
    {
        $file = $this->request->getFile('gambar_file');
        if (!$file || !$file->isValid()) {
            return $this->fail('File tidak valid atau tidak ditemukan.', 400);
        }

        if ($file->hasMoved()) {
            return $this->fail('File sudah dipindahkan.', 400);
        }

        // Validasi tipe file & ukuran (maksimal 5MB)
        $validation = \Config\Services::validation();
        $validation->setRules([
            'gambar_file' => 'uploaded[gambar_file]|is_image[gambar_file]|max_size[gambar_file,5120]',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->failValidationErrors($validation->getErrors());
        }

        // Generate nama acak
        $newName = $file->getRandomName();
        
        // Pindahkan ke folder public/uploads
        $file->move(ROOTPATH . 'public/uploads', $newName);

        $fileUrl = base_url('uploads/' . $newName);

        return $this->respond([
            'status' => 200,
            'message' => 'Gambar berhasil diupload.',
            'url' => $fileUrl
        ], 200);
    }
}
