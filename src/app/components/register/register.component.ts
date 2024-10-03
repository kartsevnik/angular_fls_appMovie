// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        // Перенаправление после успешной регистрации
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  }

  goToPageLogin() {
    this.router.navigate([{ outlets: { login: ['login'] } }]);
  }

  goToPageHome() {
    this.router.navigate(['/']);
  }
}
