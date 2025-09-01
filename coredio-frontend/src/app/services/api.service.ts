import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Patient {
  id?: number;
  medicalId: string;
  name: string;
  age: number;
}
export interface Reading {
  id?: number;
  patientId: number;
  timestamp?: string;
  heartRate: number;
  systolic: number;
  diastolic: number;
  cardiacOutput: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  
  constructor(private http: HttpClient) {}

  private patientsBase = environment.patientsApi;
  private readingsBase = environment.readingsApi;  

  listPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.patientsBase}/api/patients`);
  }
  addPatient(p: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.patientsBase}/api/patients`, p);
  }

  listReadings(patientId: number): Observable<Reading[]> {
    return this.http.get<Reading[]>(`${this.readingsBase}/api/readings?patientId=${patientId}`);
  }
  addReading(r: Reading): Observable<Reading> {
    return this.http.post<Reading>(`${this.readingsBase}/api/readings`, r);
  }
}
