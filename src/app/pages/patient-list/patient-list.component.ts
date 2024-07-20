import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {
  notificationService = inject(NotificationService);
  private patientService = inject(PatientService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  patients$ = new Observable<Patient[]>();

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }

  editPatient(patient: Patient): void {
    console.log('Editing patient:', patient);
    this.router.navigate(['/patient-form', patient.id]);
  }

  confirmDelete(patient: Patient): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name: patient.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deletePatient(patient);
      }
    });
  }

  deletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient.id).subscribe(() => {
      this.patients$ = this.patientService.getPatients();
      this.notificationService.showSuccess(`Patient ${patient.name} deleted successfully!`);
    });
  }
}
