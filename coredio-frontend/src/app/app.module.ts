import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ReadingsListComponent } from './components/readings-list/readings-list.component';
import { AddReadingComponent } from './components/add-reading/add-reading.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    AddPatientComponent,
    ReadingsListComponent,
    AddReadingComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
