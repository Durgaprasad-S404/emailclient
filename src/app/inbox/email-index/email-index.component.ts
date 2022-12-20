import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { EmailSummary } from '../interfaces/email_summary';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emails: EmailSummary[] = [];

  constructor(private emailservice: EmailService) {}

  ngOnInit() {
    this.emailservice.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }
}
