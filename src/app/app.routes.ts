import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointment-list', component: AppointmentListComponent },
  { path: 'patient-list', component: PatientListComponent },
];
