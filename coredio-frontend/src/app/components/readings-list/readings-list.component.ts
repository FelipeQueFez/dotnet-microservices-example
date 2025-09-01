import { Component, Input } from '@angular/core';
import { Reading } from '../../services/api.service';

@Component({
  selector: 'app-readings-list',
  template: `
    <table width="100%" style="border-collapse:collapse;border:1px solid #eee;margin-top:8px">
      <thead><tr style="background:#fafafa">
        <th align="left">Time (UTC)</th><th>HR</th><th>Sys</th><th>Dia</th><th>CO</th>
      </tr></thead>
      <tbody>
        <tr *ngFor="let r of data" style="border-top:1px solid #eee">
          <!-- Use ternary + date pipe; no 'new Date()' in template -->
          <td>{{ r.timestamp ? (r.timestamp | date:'yyyy-MM-dd HH:mm:ss':'UTC')
                             : (now | date:'yyyy-MM-dd HH:mm:ss':'UTC') }}</td>
          <td align="center">{{ r.heartRate }}</td>
          <td align="center">{{ r.systolic }}</td>
          <td align="center">{{ r.diastolic }}</td>
          <td align="center">{{ r.cardiacOutput | number:'1.1-1' }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class ReadingsListComponent {
  @Input() data: Reading[] = [];
  now = new Date();  // fallback for rows without timestamp
}
