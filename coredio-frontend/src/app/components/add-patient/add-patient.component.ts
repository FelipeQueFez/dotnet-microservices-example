import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-patient',
  template: `
    <form (ngSubmit)="submit()" style="display:grid;gap:6px;margin-bottom:16px;max-width:320px">
      <strong>Add Patient</strong>
      <input placeholder="Name" [(ngModel)]="name" name="name" required>
      <input type="number" placeholder="Age" [(ngModel)]="age" name="age">
      <input placeholder="Medical ID" [(ngModel)]="medicalId" name="medicalId" required>
      <button type="submit">Add</button>
    </form>
  `
})
export class AddPatientComponent {
  name = '';
  age = 60;
  medicalId = 'PT-NEW';
  @Output() added = new EventEmitter<void>();
  constructor(private api: ApiService) {}
  submit() {
    this.api.addPatient({ name: this.name, age: this.age, medicalId: this.medicalId }).subscribe(() => {
      this.name = ''; this.age = 60; this.medicalId = 'PT-NEW';
      this.added.emit();
    });
  }
}
