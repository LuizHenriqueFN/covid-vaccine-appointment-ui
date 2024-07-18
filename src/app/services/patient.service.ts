import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../model/patient.model';
import { Observable } from 'rxjs';
import { env } from '../env/environments';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private api = '/api/Patient'
  private http = inject(HttpClient)

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.api);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.api}/${id}`);
  }
}
