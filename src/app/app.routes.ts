import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'appointment-list',
    loadComponent: () => import('./pages/appointment-list/appointment-list.component').then(
      (module) => module.AppointmentListComponent
    )
  },
  {
    path: 'patient-list',
    loadComponent: () => import('./pages/patient-list/patient-list.component').then(
      (module) => module.PatientListComponent
    )
  },
  {
    path: 'appointment-form',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/appointment-form/appointment-form.component').then(
          (module) => module.AppointmentFormComponent
        )
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/appointment-form/appointment-form.component').then(
          (module) => module.AppointmentFormComponent
        )
      },
    ]
  },
  {
    path: 'patient-form',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/patient-form/patient-form.component').then(
          (module) => module.PatientFormComponent
        )
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/patient-form/patient-form.component').then(
          (module) => module.PatientFormComponent
        )
      },
    ]
  },
  {
    path: 'notification',
    loadComponent: () => import('./pages/notification/notification.component').then(
      (module) => module.NotificationComponent
    )
  },
  { path: '**', redirectTo: '/' },
];
