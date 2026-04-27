import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.auth.getUserRole() === 'admin';
  }
}