import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioFormComponent } from './horario-form/horario-form.component';

const routes: Routes = [
  { path: 'horario/create', component: HorarioFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioRoutingModule {}
