import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private api = '/api/Appointment'
  private http = inject(HttpClient)

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.api);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.api}/${id}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.api, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}