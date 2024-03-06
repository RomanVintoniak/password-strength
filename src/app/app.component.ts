import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordStrengthService } from './services/password-strength.service';
import { PasswordStrengthIndication } from './models/password-strength-indication.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private fb = inject(FormBuilder);
  private passwordService = inject(PasswordStrengthService);
  form: FormGroup;

  segmentColors: string[] = ['', '', ''];

  defaultState: PasswordStrengthIndication = { count: 3, color: 'gray' };
  passwordStrengthConfig = new Map<number, PasswordStrengthIndication>([
    [0, { count: 3, color: 'red' }],
    [1, { count: 1, color: 'red' }],
    [2, { count: 2, color: 'yellow' }],
    [3, { count: 3, color: 'green' }]
  ]);

  constructor() {
    this.form = this.fb.group({
      password: ['', Validators.required]
    });

    this.form.controls['password'].valueChanges.subscribe(pass => {
      this.setStrength(this.defaultState);
      const strength = this.passwordService.checkStrength(pass);
      const strengthConfig = this.passwordStrengthConfig.get(strength) ?? this.defaultState;
      this.setStrength(strengthConfig);
    })
  }

  private setStrength(passwordStrengthIndication: PasswordStrengthIndication): void {
    for (let i = 0; i < passwordStrengthIndication.count; i++) {
      this.segmentColors[i] = passwordStrengthIndication.color;
    }
  }
}