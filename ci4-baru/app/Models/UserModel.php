<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['username', 'password', 'nama_lengkap', 'auth_token'];
    protected $useTimestamps    = true;
    protected $returnType       = 'array';
}
