import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        // Перенаправление после успешной регистрации
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  }

  goToPageRegister() {
    this.router.navigate([{ outlets: { login: ['registration'] } }]);
  }

  goToPageHome() {
    this.router.navigate(['/']);
  }
}
