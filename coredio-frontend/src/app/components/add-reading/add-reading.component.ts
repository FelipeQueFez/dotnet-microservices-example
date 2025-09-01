import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-reading',
  template: `
    <form (ngSubmit)="submit()" style="display:flex;gap:8px;align-items:end;margin:12px 0;">
      <div><label>HR</label><input type="number" [(ngModel)]="hr" name="hr"></div>
      <div><label>Sys</label><input type="number" [(ngModel)]="sys" name="sys"></div>
      <div><label>Dia</label><input type="number" [(ngModel)]="dia" name="dia"></div>
      <div><label>CO</label><input type="number" step="0.1" [(ngModel)]="co" name="co"></div>
      <button type="submit">Add</button>
    </form>
  `
})
export class AddReadingComponent {
  @Input() patientId!: number;
  @Output() added = new EventEmitter<void>();
  hr = 78; sys = 120; dia = 80; co = 5.0;

  constructor(private api: ApiService) {}

  submit() {
    this.api.addReading({ patientId: this.patientId, heartRate: this.hr, systolic: this.sys, diastolic: this.dia, cardiacOutput: this.co })
      .subscribe(() => this.added.emit());
  }
}
