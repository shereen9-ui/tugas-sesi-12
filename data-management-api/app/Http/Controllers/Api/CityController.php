<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\JsonResponse;

class CityController extends Controller
{
    public function index(int $province): JsonResponse
    {
        return response()->json(
            City::where('province_id', $province)
                ->orderBy('name')
                ->get()
        );
    }
}
