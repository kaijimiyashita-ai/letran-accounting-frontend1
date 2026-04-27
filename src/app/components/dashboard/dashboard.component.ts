import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    total_students: 0,
    fully_paid: 0,
    partial_paid: 0,
    unpaid: 0,
    dics_count: 0,
    bsba_count: 0,
    beed_count: 0
  };

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.refreshStats();
  }

  refreshStats(): void {
    this.data.getDashboardStats().subscribe({
      next: (res) => this.stats = res,
      error: (err) => console.error('Dashboard stats error', err)
    });
  }

  filterByDepartment(dept: string): void {
    this.router.navigate(['/records'], { queryParams: { department: dept } });
  }
}