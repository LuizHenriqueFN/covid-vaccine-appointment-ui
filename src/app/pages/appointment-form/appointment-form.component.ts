import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionSelectionChange } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient.model';
import { Observable } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentLimit } from '../../model/appointmentLimit.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
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
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  availableTimes: string[] = [];
  patients$ = new Observable<Patient[]>();
  private localStorageKey = 'appointmentFormData';

  patientService = inject(PatientService);
  appointmentService = inject(AppointmentService);
  notificationService = inject(NotificationService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      StatusDescription: ['Pendente', Validators.required],
      patientId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
    this.availableTimes = this.generateAvailableTimes();
    this.loadFormData();
    this.appointmentForm.valueChanges.subscribe(() => {
      this.saveFormData();
    });
  }

  loadFormData(): void {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      this.appointmentForm.setValue(JSON.parse(savedData));
    }
  }

  saveFormData(): void {
    const formData = this.appointmentForm.value;
    localStorage.setItem(this.localStorageKey, JSON.stringify(formData));
  }

  clearFormData(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  generateAvailableTimes(): string[] {
    const times: string[] = [];
    for (let hour = 7; hour <= 18; hour++) {
      const hourString = hour < 10 ? `0${hour}` : `${hour}`;
      times.push(`${hourString}:00`);
    }
    return times;
  }

  createAppointmentLimit(): AppointmentLimit {
    const formValues = this.appointmentForm.value;
    return {
      appointmentDate: formValues.appointmentDate,
      appointmentTime: formValues.appointmentTime,
      dayLimit: 0,
      timeLimit: 0
    };
  }

  onDateChange(): void {
    this.appointmentForm.patchValue({ appointmentTime: '' });
  }

  onTimeChange(time: MatOptionSelectionChange<string>): void {
    if (!!this.appointmentForm.value.appointmentDate) {
      const aptLimit = this.createAppointmentLimit();
      aptLimit.appointmentTime = time.source.value;
      this.appointmentService.getAppointmentLimit(aptLimit).subscribe(limit => {
        if (limit.dayLimit < 20) {
          if(limit.timeLimit) {
            this.appointmentForm.patchValue({ appointmentTime: '' });
            this.notificationService.showError("The number of patients for the selected time slot has reached the limit.");
          }
        } else {
          this.notificationService.showError("The number of appointments for the day has reached the limit.");
          this.appointmentForm.patchValue({
            appointmentDate: '',
            appointmentTime: ''
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(
        () => {
          this.notificationService.showSuccess('Appointment successfully created!');
          this.clearFormData();
          this.router.navigate(['']);
        },
        (error) => {
          this.notificationService.showError('Failed to create appointment.');
          console.error('Error:', error);
        }
      )
    }
  }
}
