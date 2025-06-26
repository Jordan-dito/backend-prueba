<?php



namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class DepartamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
   
   public function run()
{
    DB::table('departamentos')->insert([
        [
            'codigo' => 'DEP001',
            'nombre' => 'Recursos Humanos',
            'activo' => true,
            'idUsuarioCreacion' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'codigo' => 'DEP002',
            'nombre' => 'Tecnología',
            'activo' => true,
            'idUsuarioCreacion' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ],
    ]);
}

}
