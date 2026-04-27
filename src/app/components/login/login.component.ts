import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.error = 'Invalid credentials'
    });
  }
}