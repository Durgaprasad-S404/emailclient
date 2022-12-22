import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (
      this.authForm.invalid &&
      this.authForm.controls.username === null &&
      this.authForm.controls.password === null
    ) {
      return;
    }

    this.authService
      .signin({
        username: this.authForm.controls.username.value,
        password: this.authForm.controls.password.value,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/inbox');
        },
        error: ({ error }) => {
          if (error.username || error.password) {
            this.authForm.setErrors({ credentials: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
  }

  returnFormErrors(): String | null {
    if (this.authForm.errors !== null) {
      if (this.authForm.errors['credentials']) {
        return 'Invalid username or password';
      } else if (this.authForm.errors['unknownError']) {
        return 'Unknown error';
      }
    }
    return null;
  }
}
