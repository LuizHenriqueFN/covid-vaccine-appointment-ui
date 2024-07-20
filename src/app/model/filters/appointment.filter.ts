import { PatientFilter } from "./patient.filter";

export type AppointmentFilter = {
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  statusDescription: string;
  patient: PatientFilter;
}
