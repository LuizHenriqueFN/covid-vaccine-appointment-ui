import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {

  private patientService = inject(PatientService);

  patients$ = new Observable<Patient[]>();

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }

  editPatient(patient: Patient): void {
    console.log('Editing patient:', patient);
  }

  deletePatient(patient: Patient): void {
    console.log('Deleting patient:', patient);
    this.patientService.deletePatient(patient.id).subscribe(() => {
      this.patients$ = this.patientService.getPatients();
    });
  }
}
