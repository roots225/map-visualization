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
        return new Merchant([
            'name' => $row['address'],
            'address' => $row['address'],
            'city' => $row['address'],
            'town' => $row['address'],
            'complete_address' => $row['address'],
        ]);
    }

    public function headingRow(): int
    {
        return 2;
    }
}
