import { Component, OnInit } from '@angular/core';
import { ApiService, Patient, Reading } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .grid { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; }
    .container { padding: 20px; max-width: 1100px; margin: 0 auto; font-family: system-ui, sans-serif; }
  `]
})
export class AppComponent implements OnInit {
  title = 'Coredio PoC Dashboard';
  patients: Patient[] = [];
  readings: Reading[] = [];
  selected?: Patient;

  constructor(private api: ApiService) {}

  ngOnInit() { this.refreshPatients(); }

  refreshPatients() {
    this.api.listPatients().subscribe(p => this.patients = p);
  }
  onSelect(p: Patient) {
    this.selected = p;
    this.api.listReadings(p.id!).subscribe(r => this.readings = r);
  }
  afterAddPatient() { this.refreshPatients(); }
  afterAddReading() {
    if (this.selected?.id) this.api.listReadings(this.selected.id).subscribe(r => this.readings = r);
  }
}
