<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class SupplierController extends ResourceController
{
    protected $modelName = SupplierModel::class;
    protected $format     = 'json';

    // GET /api/supplier
    public function index()
    {
        $data = $this->model->orderBy('id', 'DESC')->findAll();
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    // GET /api/supplier/{id}
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Supplier tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    // POST /api/supplier
    public function create()
    {
        $input = $this->request->getJSON(true) ?? $this->request->getPost();

        $rules = [
            'nama_supplier' => 'required|min_length[2]|max_length[150]',
        ];

        if (!$this->validateData($input, $rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'nama_supplier' => $input['nama_supplier'],
            'alamat'        => $input['alamat'] ?? null,
            'no_telepon'    => $input['no_telepon'] ?? null,
            'email'         => $input['email'] ?? null,
        ]);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Supplier berhasil ditambahkan.',
            'data'    => $this->model->find($id),
        ]);
    }

    // PUT/PATCH /api/supplier/{id}
    public function update($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Supplier tidak ditemukan.');
        }

        $input = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $this->model->update($id, [
            'nama_supplier' => $input['nama_supplier'] ?? $data['nama_supplier'],
            'alamat'        => $input['alamat'] ?? $data['alamat'],
            'no_telepon'    => $input['no_telepon'] ?? $data['no_telepon'],
            'email'         => $input['email'] ?? $data['email'],
        ]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Supplier berhasil diperbarui.',
            'data'    => $this->model->find($id),
        ], 200);
    }

    // DELETE /api/supplier/{id}
    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Supplier tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Supplier berhasil dihapus.',
        ]);
    }
}
