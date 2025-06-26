<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('usuario')->nullable();
        $table->string('primerNombre')->nullable();
        $table->string('segundoNombre')->nullable();
        $table->string('primerApellido')->nullable();
        $table->string('segundoApellido')->nullable();
        $table->unsignedBigInteger('idDepartamento')->nullable();
        $table->unsignedBigInteger('idCargo')->nullable();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn([
            'usuario',
            'primerNombre',
            'segundoNombre',
            'primerApellido',
            'segundoApellido',
            'idDepartamento',
            'idCargo'
        ]);
    });
}

};
