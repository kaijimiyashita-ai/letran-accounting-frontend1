import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface RecordFilter {
  department?: string;
  year_level?: string;
  semester?: string;
  sort_by?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://letran-accounting-backend1.onrender.com/api/';

  constructor(private http: HttpClient) { }

  getDashboardStats() { return this.http.get<any>(`${this.apiUrl}dashboard/`); }

  getRecords(filters?: RecordFilter) {
    let params = new HttpParams();
    if (filters) {
      if (filters.department) params = params.set('department', filters.department);
      if (filters.year_level) params = params.set('year_level', filters.year_level);
      if (filters.semester) params = params.set('semester', filters.semester);
      if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    }
    return this.http.get<any>(`${this.apiUrl}records/`, { params });
  }

  getRecord(id: number) { return this.http.get<any>(`${this.apiUrl}records/${id}/`); }
  createRecord(record: any) { return this.http.post(`${this.apiUrl}records/`, record); }
  updateRecord(id: number, record: any) { return this.http.put(`${this.apiUrl}records/${id}/`, record); }
  deleteRecord(id: number) { return this.http.delete(`${this.apiUrl}records/${id}/`); }

  getPayments() { return this.http.get<any>(`${this.apiUrl}payments/`); }
  createPayment(payment: any) { return this.http.post(`${this.apiUrl}payments/`, payment); }

  getLedger(id: number) { return this.http.get<any>(`${this.apiUrl}ledger/${id}/`); }

  searchRecords(query: string) {
    return this.http.get<any>(`${this.apiUrl}search/?q=${query}`);
  }
}
