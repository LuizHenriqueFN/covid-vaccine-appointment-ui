import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToAppointmentList() {
    this.router.navigate(['/appointment-list']);
  }

  navigateToPatientList() {
    this.router.navigate(['/patient-list']);
  }

  navigateToAppointmentForm() {
    this.router.navigate(['/appointment-form']);
  }

  navigateToPatientForm() {
    this.router.navigate(['/patient-form']);
  }
}
