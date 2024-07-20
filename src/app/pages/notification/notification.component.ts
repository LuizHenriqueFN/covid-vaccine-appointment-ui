import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Appointment } from '../../model/appointment.model';
import { AppointmentFilter } from '../../model/filters/appointment.filter';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    DatePipe,
    MatIconModule,
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
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  private appointmentService = inject(AppointmentService);

  notificationForm: FormGroup;
  appointments: Appointment[] = [];
  renderTable: Boolean = false

  constructor(private fb: FormBuilder) {
    this.notificationForm = this.fb.group({
      patientName: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  createAppointmentFilter(): AppointmentFilter {
    const formValues = this.notificationForm.value;
    return {
      patient: {
          name: formValues.patientName
      }
    };
  }

  onSubmit() {
    if (this.notificationForm.valid) {
      const filter = this.createAppointmentFilter();
      this.appointmentService.getAppointmentsByFilter(filter).subscribe(res => {
        this.renderTable = true;
        this.appointments = res
      })
    }
  }
}
