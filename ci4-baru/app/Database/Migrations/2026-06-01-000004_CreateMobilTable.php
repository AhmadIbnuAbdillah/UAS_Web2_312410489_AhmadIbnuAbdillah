<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMobilTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'kategori_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],
            'supplier_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],
            'nama_mobil' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
            ],
            'merek' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],
            'tahun_produksi' => [
                'type'       => 'INT',
                'constraint' => 4,
            ],
            'warna' => [
                'type'       => 'VARCHAR',
                'constraint' => 50,
                'null'       => true,
            ],
            'no_plat' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'null'       => true,
            ],
            'harga' => [
                'type'       => 'DECIMAL',
                'constraint' => '15,2',
                'default'    => 0,
            ],
            'stok' => [
                'type'       => 'INT',
                'constraint' => 11,
                'default'    => 0,
            ],
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['tersedia', 'terjual', 'maintenance'],
                'default'    => 'tersedia',
            ],
            'gambar' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
                'null'       => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('kategori_id', 'kategori', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('supplier_id', 'supplier', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('mobil');
    }

    public function down()
    {
        $this->forge->dropTable('mobil');
    }
}
