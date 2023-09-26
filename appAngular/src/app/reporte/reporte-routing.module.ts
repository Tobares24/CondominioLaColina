import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteAllComponent } from './reporte-all/reporte-all.component';

const routes: Routes = [
  { path: 'reporte/graph', component: ReporteAllComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteRoutingModule {}
