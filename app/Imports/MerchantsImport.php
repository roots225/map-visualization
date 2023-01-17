<?php

namespace App\Imports;

use App\Models\Merchant;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MerchantsImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if (!$row['latitude'] && !$row['longitude']) {
            return;
        }
        
        return new Merchant([
            'hp2' => $row['hp2'],
            'address' => $row['adresses_du_patrimoine'],
            'city' => $row['ville'],
            'postal_code' => $row['code_postal'],
            'complete_address' => $row['adresse_totale'],
            'lat' => $row['latitude'],
            'lng' => $row['longitude'],
        ]);
    }

    public function headingRow(): int
    {
        return 1;
    }
}
