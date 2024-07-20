import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private api = '/api/Patient'
  private http = inject(HttpClient)

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.api);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.api}/${id}`);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.api, patient);
  }

  updatePatient(patient: Patient, id: number): Observable<Patient> {
    return this.http.put<Patient>(`${this.api}/${id}`, patient);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.api}/${id}`);
  }
}
