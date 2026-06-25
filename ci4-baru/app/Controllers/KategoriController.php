<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class KategoriController extends ResourceController
{
    protected $modelName = KategoriModel::class;
    protected $format     = 'json';

    // GET /api/kategori
    public function index()
    {
        $data = $this->model->orderBy('id', 'DESC')->findAll();
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    // GET /api/kategori/{id}
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    // POST /api/kategori
    public function create()
    {
        $input = $this->request->getJSON(true) ?? $this->request->getPost();

        $rules = [
            'nama_kategori' => 'required|min_length[2]|max_length[100]',
        ];

        if (!$this->validateData($input, $rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'nama_kategori' => $input['nama_kategori'],
            'deskripsi'     => $input['deskripsi'] ?? null,
        ]);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Kategori berhasil ditambahkan.',
            'data'    => $this->model->find($id),
        ]);
    }

    // PUT/PATCH /api/kategori/{id}
    public function update($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $input = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $this->model->update($id, [
            'nama_kategori' => $input['nama_kategori'] ?? $data['nama_kategori'],
            'deskripsi'     => $input['deskripsi'] ?? $data['deskripsi'],
        ]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Kategori berhasil diperbarui.',
            'data'    => $this->model->find($id),
        ], 200);
    }

    // DELETE /api/kategori/{id}
    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }
}
