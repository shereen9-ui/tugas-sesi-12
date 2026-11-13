<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\District;
use Illuminate\Http\JsonResponse;

class DistrictController extends Controller
{
    public function index(int $city): JsonResponse
    {
        return response()->json(
            District::where('city_id', $city)
                ->orderBy('name')
                ->get()
        );
    }
}
