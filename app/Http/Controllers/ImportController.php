<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'data' => 'required|file'
        ], [
            'required' => 'Vous devez charger un fichier excel',
            'file' => 'Le fichier doit être de type tableur'
        ]);

        dd($request);

        $extension = $request->file('data')->extension();
        $filename = "coordonnees-". date('dHYmis') . ".$extension";
        $path = $request->file('data')->storeAs('datas', $filename, 'public');
        

        return response()->json([
            'msg' => 'Données importés avec succès',
            'data' => $response,
        ]);
    }
}
