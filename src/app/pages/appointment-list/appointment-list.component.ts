import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Appointment } from '../../model/appointment.model';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  private appointmentService = inject(AppointmentService);

  appointments$ = new Observable<Appointment[]>();

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments();
  }

  viewAppointment(appointment: Appointment): void {
    console.log('Viewing appointment:', appointment);
  }

  editAppointment(appointment: Appointment): void {
    console.log('Editing appointment:', appointment);
  }

  deleteAppointment(appointment: Appointment): void {
    console.log('Deleting appointment:', appointment);
    this.appointmentService.deleteAppointment(appointment.id).subscribe(() => {
      this.appointments$ = this.appointmentService.getAppointments();
    });
  }
}
