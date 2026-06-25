<?php

namespace App\Models;

use CodeIgniter\Model;

class SupplierModel extends Model
{
    protected $table         = 'supplier';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['nama_supplier', 'alamat', 'no_telepon', 'email'];
    protected $useTimestamps = true;
    protected $returnType    = 'array';
}
