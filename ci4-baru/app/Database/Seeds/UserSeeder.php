<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'username'     => 'admin',
            // password asli: admin123
            'password'     => password_hash('admin123', PASSWORD_DEFAULT),
            'nama_lengkap' => 'Administrator',
            'auth_token'   => bin2hex(random_bytes(32)),
            'created_at'   => date('Y-m-d H:i:s'),
            'updated_at'   => date('Y-m-d H:i:s'),
        ];

        $this->db->table('users')->insert($data);
    }
}
