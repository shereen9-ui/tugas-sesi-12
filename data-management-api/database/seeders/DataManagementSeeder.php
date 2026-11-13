<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Province;
use App\Models\City;
use App\Models\District;
use Illuminate\Database\Seeder;

class DataManagementSeeder extends Seeder
{
    public function run(): void
    {
        $regions = [
            'Kepulauan Riau' => [
                'Batam' => ['Batam Kota', 'Sekupang', 'Lubuk Baja'],
                'Natuna' => ['Bunguran Timur', 'Bunguran Barat'],
                'Anambas' => ['Siantan', 'Palmatak'],
            ],
            'Jawa Barat' => [
                'Bandung' => ['Coblong', 'Sukajadi'],
                'Bekasi' => ['Bekasi Selatan', 'Bekasi Utara'],
            ],
        ];

        foreach ($regions as $provinceName => $cities) {
            $province = Province::firstOrCreate([
                'name' => $provinceName,
            ]);

            foreach ($cities as $cityName => $districts) {
                $city = City::firstOrCreate([
                    'province_id' => $province->id,
                    'name' => $cityName,
                ]);

                foreach ($districts as $districtName) {
                    District::firstOrCreate([
                        'city_id' => $city->id,
                        'name' => $districtName,
                    ]);
                }
            }
        }

        if (Employee::query()->doesntExist()) {
            $employees = [
                ['Andi', 'Developer', 'Aktif'],
                ['Budi', 'Designer', 'Aktif'],
                ['Citra', 'Manager', 'Aktif'],
                ['Dina', 'Analyst', 'Aktif'],
                ['Eko', 'Developer', 'Nonaktif'],
                ['Fajar', 'Designer', 'Aktif'],
                ['Gita', 'Manager', 'Nonaktif'],
                ['Hendra', 'Analyst', 'Aktif'],
                ['Indah', 'Developer', 'Aktif'],
                ['Joko', 'Designer', 'Nonaktif'],
                ['Karin', 'Manager', 'Aktif'],
                ['Lukman', 'Analyst', 'Aktif'],
            ];

            foreach ($employees as [$name, $position, $status]) {
                Employee::create([
                    'name' => $name,
                    'position' => $position,
                    'status' => $status,
                ]);
            }
        }
    }
}
