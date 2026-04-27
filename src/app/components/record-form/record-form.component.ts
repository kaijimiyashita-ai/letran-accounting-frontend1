import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  record: any = {
    student_id: '',
    full_name: '',
    department: 'DICS',
    year_level: '1st Year',
    semester: '1st Semester',
    contact_number: '',
    total_fees: 0
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.data.getRecord(id).subscribe({
        next: (res) => this.record = res,
        error: () => alert('Failed to load record')
      });
    }
  }

  save(): void {
    if (this.isEdit) {
      this.data.updateRecord(this.record.id, this.record).subscribe({
        next: () => this.router.navigate(['/records']),
        error: (err) => console.error('Update error', err)
      });
    } else {
      this.data.createRecord(this.record).subscribe({
        next: () => this.router.navigate(['/records']),
        error: (err) => console.error('Create error', err)
      });
    }
  }
}