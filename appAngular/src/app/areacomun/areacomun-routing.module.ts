import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreacomunAllComponent } from './areacomun-all/areacomun-all.component';

const routes: Routes = [
  { path: 'areacomun/all', component: AreacomunAllComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreacomunRoutingModule {}
