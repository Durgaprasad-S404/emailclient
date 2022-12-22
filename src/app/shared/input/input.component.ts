import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() inputType: string = '';
  @Input() controlType = 'input';

  constructor() {}

  showErrors(): false | ValidationErrors | null {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
