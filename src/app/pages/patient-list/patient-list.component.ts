import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {

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
