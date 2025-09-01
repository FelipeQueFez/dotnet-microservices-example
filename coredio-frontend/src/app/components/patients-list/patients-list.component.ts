import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../services/api.service';

@Component({
  selector: 'app-patients-list',
  template: `
    <h3>Patients</h3>
    <ul style="list-style:none;padding:0;margin:0;">
      <li *ngFor="let p of data"
          (click)="select.emit(p)"
          [style.background]="selectedId===p.id ? '#eef7ff' : 'white'"
          style="border:1px solid #ddd;border-radius:8px;margin-bottom:8px;padding:8px;cursor:pointer;">
        <b>{{p.name}}</b> — Age {{p.age}} <br/>
        <small>{{p.medicalId}}</small>
      </li>
    </ul>
  `
})
export class PatientsListComponent {
  @Input() data: Patient[] = [];
  @Input() selectedId?: number;
  @Output() select = new EventEmitter<Patient>();
}
