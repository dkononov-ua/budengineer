import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss']
})

export class RecaptchaComponent {
  onClick(event: Event): void {
    event.preventDefault();

    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(
          'ВАШ_SITE_KEY', // Замініть на ваш Site Key
          { action: 'LOGIN' }
        );
        console.log('reCAPTCHA Token:', token);
        // Відправте цей токен на сервер для перевірки
      } catch (error) {
        console.error('reCAPTCHA Error:', error);
      }
    });
  }
}
