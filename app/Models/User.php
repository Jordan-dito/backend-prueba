<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'usuario',
        'email',
        'password',
        'primerNombre',
        'segundoNombre',
        'primerApellido',
        'segundoApellido',
        'idDepartamento',
        'idCargo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relación con Departamento
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'idDepartamento');
    }

    // Relación con Cargo
    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'idCargo');
    }
}
