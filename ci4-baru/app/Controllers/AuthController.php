<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class AuthController extends ResourceController
{
    protected $modelName = UserModel::class;
    protected $format     = 'json';

    /**
     * POST /api/login
     * Memvalidasi username & password, lalu mengembalikan auth_token
     */
    public function login()
    {
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        if (empty($username) || empty($password)) {
            return $this->respond([
                'status'  => 400,
                'message' => 'Username dan password wajib diisi.',
            ], 400);
        }

        $user = $this->model->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->respond([
                'status'  => 401,
                'message' => 'Username atau password salah.',
            ], 401);
        }

        // Generate token baru setiap login (sederhana, untuk keperluan tugas)
        $newToken = bin2hex(random_bytes(32));
        $this->model->update($user['id'], ['auth_token' => $newToken]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Login berhasil.',
            'data'    => [
                'id'           => $user['id'],
                'username'     => $user['username'],
                'nama_lengkap' => $user['nama_lengkap'],
                'token'        => $newToken,
            ],
        ], 200);
    }

    /**
     * POST /api/logout
     * Menghapus auth_token user yang sedang login (butuh Bearer Token)
     */
    public function logout()
    {
        $authHeader = $this->request->getHeaderLine('Authorization');
        preg_match('/Bearer\s(\S+)/', $authHeader, $matches);
        $token = $matches[1] ?? null;

        if ($token) {
            $user = $this->model->where('auth_token', $token)->first();
            if ($user) {
                $this->model->update($user['id'], ['auth_token' => null]);
            }
        }

        return $this->respond([
            'status'  => 200,
            'message' => 'Logout berhasil.',
        ], 200);
    }
}
