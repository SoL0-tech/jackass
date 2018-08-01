import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTableModule,
} from '@angular/material';
import { FormatSizePipe } from './format-size.pipe'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FormatSizePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormatSizePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
