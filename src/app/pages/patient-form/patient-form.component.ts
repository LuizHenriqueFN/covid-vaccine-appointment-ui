import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  private localStorageKey = 'patientFormData';
  private patientId: number = 0;

  patientService = inject(PatientService);
  notificationService = inject(NotificationService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.patientId = idParam ? +idParam : 0;
      this.loadFormData();
    });
    this.patientForm.valueChanges.subscribe(() => {
      this.saveFormData();
    });
  }

  loadFormData(): void {
    if (this.patientId != 0) {
      this.patientService.getPatientById(this.patientId).subscribe(res => {
        this.clearFormData();
        this.patientForm.patchValue({
          name: res.name,
          birthDate: res.birthDate
        });
      })

    } else {
      const savedData = localStorage.getItem(this.localStorageKey);
      if (savedData) {
        this.patientForm.setValue(JSON.parse(savedData));
      }
    }
  }

  saveFormData(): void {
    const formData = this.patientForm.value;
    localStorage.setItem(this.localStorageKey, JSON.stringify(formData));
  }

  clearFormData(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  onSubmit() {
    if (this.patientForm.valid) {
      if (this.patientId != 0) {
        this.patientService.updatePatient(this.patientForm.value, this.patientId).subscribe(
          () => {
            this.notificationService.showSuccess('Patient successfully updated!');
            this.clearFormData();
            this.router.navigate(['']);
          },
          (error) => {
            this.notificationService.showError('Failed to update patient.');
            console.error('Error:', error);
          }
        );
      } else {
        this.patientService.createPatient(this.patientForm.value).subscribe(
          () => {
            this.notificationService.showSuccess('Patient successfully created!');
            this.clearFormData();
            this.router.navigate(['']);
          },
          (error) => {
            this.notificationService.showError('Failed to create patient.');
            console.error('Error:', error);
          }
        )
      }
    }
  }
}
