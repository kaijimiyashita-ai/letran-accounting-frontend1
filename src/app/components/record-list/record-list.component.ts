import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, RecordFilter } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: any[] = [];
  searchQuery = '';
  isAdmin = false;

  // Filter controls
  departmentFilter = '';
  yearLevelFilter = '';
  semesterFilter = '';
  sortBy = '';

  constructor(
    private data: DataService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.getUserRole() === 'admin';

    // Read initial query params (e.g., from dashboard click)
    this.route.queryParams.subscribe(params => {
      if (params['department']) {
        this.departmentFilter = params['department'];
      }
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filter: RecordFilter = {};
    if (this.departmentFilter) filter.department = this.departmentFilter;
    if (this.yearLevelFilter) filter.year_level = this.yearLevelFilter;
    if (this.semesterFilter) filter.semester = this.semesterFilter;
    if (this.sortBy) filter.sort_by = this.sortBy;

    this.data.getRecords(filter).subscribe({
      next: (res) => this.records = res,
      error: () => alert('Failed to load records')
    });
  }

  clearFilters(): void {
    this.departmentFilter = '';
    this.yearLevelFilter = '';
    this.semesterFilter = '';
    this.sortBy = '';
    this.router.navigate([], { queryParams: {} }); // clear query params
    this.applyFilter();
  }

  search(): void {
    if (this.searchQuery.trim() === '') {
      this.applyFilter();
    } else {
      this.data.searchRecords(this.searchQuery).subscribe({
        next: (res) => this.records = res,
        error: () => alert('Search failed')
      });
    }
  }

  deleteRecord(id: number): void {
    if (confirm('Are you sure?')) {
      this.data.deleteRecord(id).subscribe({
        next: () => this.applyFilter(),
        error: () => alert('Delete failed')
      });
    }
  }
}