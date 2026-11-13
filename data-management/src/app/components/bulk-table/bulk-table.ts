
import { Component, OnInit } from '@angular/core';
import { ApiService, Employee } from '../../services/api.service';

interface EmployeeResponse {
  data: Employee[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

@Component({
  selector: 'app-bulk-table',
  standalone: true,
  imports: [],
  templateUrl: './bulk-table.html',
  styleUrl: './bulk-table.css'
})
export class BulkTable implements OnInit {

  employees: Employee[] = [];
  selectedIds: number[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  totalEmployees = 0;

  searchTerm = '';
  showSuggestions = false;
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;

    this.apiService
      .getEmployees(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: EmployeeResponse) => {
          this.employees = response.data;
          this.currentPage = response.current_page;
          this.totalPages = response.last_page;
          this.totalEmployees = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Gagal mengambil data karyawan:', error);
          this.loading = false;
        }
      });
  }

  get suggestions(): Employee[] {
    if (!this.searchTerm.trim()) {
      return [];
    }

    return this.employees.slice(0, 5);
  }

  get pageEmployees(): Employee[] {
    return this.employees;
  }

  get pageNumbers(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  get selectedCount(): number {
    return this.selectedIds.length;
  }

  get allSelected(): boolean {
    return this.pageEmployees.length > 0 &&
      this.pageEmployees.every(employee =>
        this.selectedIds.includes(employee.id)
      );
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.showSuggestions = true;
    this.loadEmployees();
  }

  selectSuggestion(name: string): void {
    this.searchTerm = name;
    this.currentPage = 1;
    this.showSuggestions = false;
    this.loadEmployees();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.showSuggestions = false;
    this.loadEmployees();
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const currentPageIds = this.pageEmployees.map(
      employee => employee.id
    );

    if (checked) {
      this.selectedIds = [
        ...new Set([...this.selectedIds, ...currentPageIds])
      ];
    } else {
      this.selectedIds = this.selectedIds.filter(
        id => !currentPageIds.includes(id)
      );
    }
  }

  toggleRow(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedIds = [...new Set([...this.selectedIds, id])];
    } else {
      this.selectedIds = this.selectedIds.filter(
        selectedId => selectedId !== id
      );
    }
  }

  bulkEdit(): void {
    if (this.selectedIds.length === 0) {
      return;
    }

    this.apiService.bulkEdit(this.selectedIds, 'Aktif').subscribe({
      next: () => {
        this.selectedIds = [];
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Gagal memperbarui karyawan:', error);
      }
    });
  }

  bulkDelete(): void {
    if (this.selectedIds.length === 0) {
      return;
    }

    const idsToDelete = [...this.selectedIds];

    this.apiService.bulkDelete(idsToDelete).subscribe({
      next: () => {
        this.selectedIds = [];
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Gagal menghapus karyawan:', error);
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEmployees();
    }
  }

  previousPage(): void {
    this.changePage(this.currentPage - 1);
  }

  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }
}
