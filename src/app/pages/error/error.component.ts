import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="error-page">
      <h1>An error occurred</h1>
      <p>Unfortunately, something went wrong.Try it later.</p>
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
