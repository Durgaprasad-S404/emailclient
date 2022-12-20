import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../interfaces/email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent {
  email: Email;
  constructor(private activatedRoute: ActivatedRoute) {
    this.email = activatedRoute.snapshot.data['email'];
    this.activatedRoute.data.subscribe(({ email }) => {
      this.email = email;
    });
  }
}
