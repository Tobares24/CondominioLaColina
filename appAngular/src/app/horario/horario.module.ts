import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';
import { HorarioFormComponent } from './horario-form/horario-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [HorarioFormComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HorarioRoutingModule,
  ],
})
export class HorarioModule {}
