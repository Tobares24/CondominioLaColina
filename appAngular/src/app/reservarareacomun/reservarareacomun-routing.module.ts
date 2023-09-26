import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarareacomunIndexComponent } from './reservarareacomun-index/reservarareacomun-index.component';
import { ReservarareacomunFormComponent } from './reservarareacomun-form/reservarareacomun-form.component';
import { ReservarareacomunDetailComponent } from './reservarareacomun-detail/reservarareacomun-detail.component';
import { ReservarareacomunAdminComponent } from './reservarareacomun-admin/reservarareacomun-admin.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {
    path: 'reserva',
    component: ReservarareacomunIndexComponent,
    canActivate: [AuthGuard],
    data: {
      id: '2',
      rol: ['residente'],
    },
  },
  {
    path: 'reserva/create/:id',
    component: ReservarareacomunFormComponent,
    canActivate: [AuthGuard],
    data: {
      id: '2',
      rol: ['residente'],
    },
  },
  {
    path: 'reserva/usuarios/:id',
    component: ReservarareacomunDetailComponent,
    canActivate: [AuthGuard],
    data: {
      id: '2',
      rol: ['residente'],
    },
  },
  {
    path: 'reserva/all',
    component: ReservarareacomunAdminComponent,
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
export class ReservarareacomunRoutingModule {}
