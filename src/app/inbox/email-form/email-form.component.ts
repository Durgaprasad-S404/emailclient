import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../interfaces/email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup = new FormGroup({});

  @Input() email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: '',
  };

  @Output() emailSubmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    const { subject, to, from, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject),
      text: new FormControl(text),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }
    this.emailSubmit.emit(this.emailForm.value);
  }
}
