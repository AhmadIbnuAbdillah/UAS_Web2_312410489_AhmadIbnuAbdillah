<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class AuthFilter implements FilterInterface
{
    /**
     * Dijalankan SEBELUM request mencapai Controller.
     * Memvalidasi Authorization Bearer Token pada header.
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        // Cek apakah header Authorization ada dan formatnya benar "Bearer xxx"
        if (empty($authHeader) || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return service('response')
                ->setJSON([
                    'status'  => 401,
                    'message' => 'Unauthorized. Token tidak ditemukan pada header.',
                ])
                ->setStatusCode(401);
        }

        $token = $matches[1];

        // Cek token ke database
        $userModel = new UserModel();
        $user      = $userModel->where('auth_token', $token)->first();

        if (!$user) {
            return service('response')
                ->setJSON([
                    'status'  => 401,
                    'message' => 'Unauthorized. Token tidak valid atau sudah kedaluwarsa.',
                ])
                ->setStatusCode(401);
        }

        // Token valid, request dilanjutkan ke Controller
    }

    /**
     * Dijalankan SETELAH Controller selesai diproses.
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak ada proses tambahan setelah response
    }
}
