import { Patient } from "./patient.model";

export type Appointment = {
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  statusDescription: string;
  patient: Patient;
  patientId: number;
}
