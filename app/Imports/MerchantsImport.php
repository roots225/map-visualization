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

        /// Check if exist
        $model = Merchant::where('hp2', $row['hp2'])->first();
        if ($model) {
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
            'libelle' => $row['libelle_groupe_immobilier_ikos'],
            'sales' => $row['ventes_'],
            'trade_name' => $row['nom_commercial'],
            'original_company' => $row['société_d_origine'],
            'dept' => $row['dept'],
            'ept' => $row['ept'],
            'epci' => $row['epci'],
            'co_ownership' => $row['copro_priete'],
            'segmentation' => $row['segmentation'],
            'zone' => $row['zone'],
            'oppv' => $row['oppv'],
            'marque' => $row['marque'],
            'collective_type' => $row['type_collectif (C) / maison_individuelle (MI)'],
            'appt' => $row['appt'],
            'maison' => $row['maison'],
            'nb_lgts' => $row['nbre_lgts'],
            'nb_cages_stairs' => $row['nombre_de_cages_escaliers'],
            'nb_affiches' => $row['nombre_d_affiches'],
            'patrimoine_destines_a_la_vente' => $row['patrimoine_destines_a_la_vente'],
            'patrimoine_destines_a_la_vente' => $row['patrimoine_destines_a_la_vente'],
            'group_name' => $row['noms_groupes_immobilier'] ?? 'N/A',
        ]);
    }

    public function headingRow(): int
    {
        return 1;
    }
}
