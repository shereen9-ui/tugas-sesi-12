
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BulkTable } from './components/bulk-table/bulk-table';
import {
  ApiService,
  Province,
  City,
  District
} from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, BulkTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  provinces: Province[] = [];
  cities: City[] = [];
  districts: District[] = [];

  selectedProvince: number | null = null;
  selectedCity: number | null = null;
  selectedDistrict: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProvinces();
  }

  loadProvinces(): void {
    this.apiService.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data;
      },
      error: (error) => {
        console.error('Gagal mengambil data provinsi:', error);
      }
    });
  }

  onProvinceChange(): void {
    this.selectedCity = null;
    this.selectedDistrict = null;
    this.cities = [];
    this.districts = [];

    if (this.selectedProvince !== null) {
      this.apiService.getCities(this.selectedProvince).subscribe({
        next: (data) => {
          this.cities = data;
        },
        error: (error) => {
          console.error('Gagal mengambil data kota:', error);
        }
      });
    }
  }

  onCityChange(): void {
    this.selectedDistrict = null;
    this.districts = [];

    if (this.selectedCity !== null) {
      this.apiService.getDistricts(this.selectedCity).subscribe({
        next: (data) => {
          this.districts = data;
        },
        error: (error) => {
          console.error('Gagal mengambil data kecamatan:', error);
        }
      });
    }
  }

  get selectedProvinceName(): string {
    return this.provinces.find(p => p.id === this.selectedProvince)?.name ?? '';
  }

  get selectedCityName(): string {
    return this.cities.find(c => c.id === this.selectedCity)?.name ?? '';
  }

  get selectedDistrictName(): string {
    return this.districts.find(d => d.id === this.selectedDistrict)?.name ?? '';
  }
}
