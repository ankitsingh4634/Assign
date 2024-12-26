import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-reactiveform',
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule here
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent {
  regForm: FormGroup;
  formData: any = null;

  constructor() {
    this.regForm = new FormGroup({});
  }

  ngOnInit() {
    this.regForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]),
      confirmPass: new FormControl('', [
        Validators.required,
        this.passwordMatchValidator.bind(this)
      ]),
      phone: new FormControl('', [
        Validators.pattern(/^[0-9]{10}$/)
      ]),
      dob: new FormControl('', [
        Validators.required,
        this.ageValidator
      ])
    });
  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (this.regForm) {
      return control.value === this.regForm.get('pass')?.value ? null : { mismatch: true };
    }
    return null;
  }

  // Validator to check if the user is at least 18 years old
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const age = new Date().getFullYear() - dob.getFullYear();
    return age >= 18 ? null : { underage: true };
  }

  // Submit form and display data (excluding passwords)
  onSubmit() {
    if (this.regForm.valid) {
      // Create a copy of the form data and exclude passwords
      const formValue = { ...this.regForm.value };
      delete formValue.pass;
      delete formValue.confirmPass;

      this.formData = formValue; // Store the sanitized form data
    } else {
      console.log('Form is invalid');
    }
  }
  onReset() {
    this.regForm.reset();
    this.formData = null;
  }

}
