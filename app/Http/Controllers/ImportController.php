<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Imports\MerchantsImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Merchant;

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

        $extension = $request->file('data')->extension();
        $filename = "coordonnees-". date('dHYmis') . ".$extension";
        $path = $request->file('data')->store('file-data');

        Excel::import(new MerchantsImport, $path);

        $datas = Merchant::all();

        return response()->json([
            'msg' => 'Données importés avec succès',
            'data' => $datas,
        ]);
    }
}
