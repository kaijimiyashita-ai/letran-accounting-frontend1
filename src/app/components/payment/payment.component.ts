import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  records: any[] = [];
  payment = { record: null, amount: 0, remarks: '' };

  constructor(private data: DataService) {}

  ngOnInit() { this.data.getRecords().subscribe(res => this.records = res); }

  submitPayment() {
    this.data.createPayment({ record: this.payment.record, amount: this.payment.amount, remarks: this.payment.remarks })
      .subscribe(() => {
        alert('Payment recorded!');
        this.payment = { record: null, amount: 0, remarks: '' };
      });
  }
}