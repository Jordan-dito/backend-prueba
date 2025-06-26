<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'usuario' => 'admin01',
                'primerNombre' => 'Juan',
                'segundoNombre' => 'Carlos',
                'primerApellido' => 'González',
                'segundoApellido' => 'Martínez',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'idDepartamento' => 1,
                'idCargo' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'usuario' => 'user02',
                'primerNombre' => 'Ana',
                'segundoNombre' => 'Lucía',
                'primerApellido' => 'Pérez',
                'segundoApellido' => 'Díaz',
                'email' => 'ana@example.com',
                'password' => Hash::make('user456'),
                'idDepartamento' => 2,
                'idCargo' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
