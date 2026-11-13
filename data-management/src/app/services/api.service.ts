
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  province_id: number;
  name: string;
}

export interface District {
  id: number;
  city_id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.apiUrl}/provinces`);
  }

  getCities(provinceId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities/${provinceId}`);
  }

  getDistricts(cityId: number): Observable<District[]> {
    return this.http.get<District[]>(`${this.apiUrl}/districts/${cityId}`);
  }

  getEmployees(page = 1, perPage = 5, search = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees`, {
      params: {
        page,
        per_page: perPage,
        search
      }
    });
  }

  createEmployee(data: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, data);
  }

  updateEmployee(id: number, data: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employees/${id}`);
  }

  bulkEdit(ids: number[], status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees/bulk-edit`, {
      ids,
      status
    });
  }

  bulkDelete(ids: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees/bulk-delete`, {
      ids
    });
  }
}
