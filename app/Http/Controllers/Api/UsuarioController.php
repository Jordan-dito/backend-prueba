<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsuarioController extends Controller
{
    // Listar todos los usuarios con sus departamentos y cargos
    public function index()
    {
        return response()->json(
            User::with(['departamento', 'cargo'])->get()
        );
    }

    // Crear nuevo usuario
    public function store(Request $request)
    {
        $validated = $request->validate([
            'usuario' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
            'primerNombre' => 'nullable|string',
            'segundoNombre' => 'nullable|string',
            'primerApellido' => 'nullable|string',
            'segundoApellido' => 'nullable|string',
            'idDepartamento' => 'nullable|integer',
            'idCargo' => 'nullable|integer',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    // Mostrar un solo usuario
    public function show($id)
    {
        $user = User::with(['departamento', 'cargo'])->findOrFail($id);
        return response()->json($user);
    }

    // Actualizar usuario
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'usuario' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string',
            'primerNombre' => 'nullable|string',
            'segundoNombre' => 'nullable|string',
            'primerApellido' => 'nullable|string',
            'segundoApellido' => 'nullable|string',
            'idDepartamento' => 'nullable|integer',
            'idCargo' => 'nullable|integer',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $user->update($validated);
        return response()->json($user);
    }

    // Eliminar usuario
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado']);
    }
}
