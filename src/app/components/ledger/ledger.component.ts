import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  ledgerData: any;
  constructor(private route: ActivatedRoute, private data: DataService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.data.getLedger(id).subscribe(res => this.ledgerData = res);
  }
}