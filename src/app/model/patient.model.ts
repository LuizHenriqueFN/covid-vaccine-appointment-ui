import { Appointment } from './appointment.model';

export type Patient = {
  id: number;
  name: string;
  birthDate: string;
  appointments: Appointment[];
}
