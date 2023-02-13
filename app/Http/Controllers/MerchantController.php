<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\Request;

class MerchantController extends Controller
{
    /**
     * Return all merchants resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = (int) $request->input('page') ?? 1;
        $perPage = (int) $request->input('per_page') ?? 10;

        $filterFields = $request->all();
        unset($filterFields['page']);
        unset($filterFields['per_page']);
        
        $this->unsetAndAdd('latitude', 'lat', $filterFields);
        $this->unsetAndAdd('longitude', 'lng', $filterFields);
        $this->unsetAndAdd('ville', 'city', $filterFields);
        $this->unsetAndAdd('code_postal', 'postal_code', $filterFields);
        $this->unsetAndAdd('adresse_totale', 'complete_address', $filterFields);
        $this->unsetAndAdd('adresses_du_patrimoine', 'address', $filterFields);

        $model = Merchant::orderBy('id');

        foreach ($filterFields as $key => $field) {
            $model->where($key, 'like', '%'.$field.'%');
        }
        
        $data = $model->paginate($perPage, ['*'], 'page', $page);
        
        return response()->json([
            'code' => 'Ok',
            'data' => $data
        ]);
    }

    private function unsetAndAdd($replaced, $added, &$data) {
        
        if (isset($data[$replaced])) {
            $data[$added] =  $data[$replaced];
            unset($data[$replaced]);
            // return $data;
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function show(Merchant $merchant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function edit(Merchant $merchant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Merchant $merchant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Merchant $merchant)
    {
        //
    }
}
