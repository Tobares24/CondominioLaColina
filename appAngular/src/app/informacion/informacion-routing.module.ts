import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionFormComponent } from './informacion-form/informacion-form.component';
import { InformacionAllComponent } from './informacion-all/informacion-all.component';
import { AuthGuard } from '../share/guards/auth.guard';
const routes: Routes = [
  {
    path: 'informacion/all',
    component: InformacionAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'informacion/create',
    component: InformacionFormComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'informacion/update/:id',
    component: InformacionFormComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionRoutingModule {}
