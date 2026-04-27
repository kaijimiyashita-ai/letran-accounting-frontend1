import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.role = this.auth.getUserRole() || 'student';
  }

  logout() { this.auth.logout(); }
}