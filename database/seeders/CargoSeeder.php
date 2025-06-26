<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargoSeeder extends Seeder
{
    public function run()
    {
        DB::table('cargos')->insert([
            [
                'codigo' => 'CAR001',
                'nombre' => 'Analista',
                'activo' => true,
                'idUsuarioCreacion' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'codigo' => 'CAR002',
                'nombre' => 'Desarrollador',
                'activo' => true,
                'idUsuarioCreacion' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
