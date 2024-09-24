import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="error-page">
      <h1>Произошла ошибка</h1>
      <p>К сожалению, что-то пошло не так. Попробуйте позже.</p>
    </div>
  `,
  styles: [`
    .error-page {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class ErrorComponent {}
