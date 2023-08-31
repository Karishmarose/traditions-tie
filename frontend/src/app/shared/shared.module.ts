import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANGULAR FORM MODULES
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// SHARED ANGULAR MATERIAL MODULES
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    // FORM MODULES
    FormsModule,
    ReactiveFormsModule,
    // ANGULAR MATERIAL MODULES
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,
    MatDividerModule
  ],
})
export class SharedModule { }
