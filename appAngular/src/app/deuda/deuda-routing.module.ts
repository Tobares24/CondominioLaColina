import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeudaAllComponent } from './deuda-all/deuda-all.component';
import { DeudaDetailComponent } from './deuda-detail/deuda-detail.component';
import { DeudaByuserComponent } from './deuda-byuser/deuda-byuser.component';
import { DeudaPayComponent } from './deuda-pay/deuda-pay.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {
    path: 'deuda/all',
    component: DeudaAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'deuda/:id',
    component: DeudaDetailComponent,
    canActivate: [AuthGuard],
    data: {
      id: ['1', '2'],
      rol: ['admin', 'residente'],
    },
  },
  {
    path: 'deuda/usuarios/:id',
    component: DeudaByuserComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'deuda/pay/:id',
    component: DeudaPayComponent,
    canActivate: [AuthGuard],
    data: {
      id: ['1', '2'],
      rol: ['admin', 'residente'],
    },
  },
  {
    path: 'deuda/estado/:id',
    component: DeudaPayComponent,
    canActivate: [AuthGuard],
    data: {
      id: ['1', '2'],
      rol: ['admin', 'residente'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeudaRoutingModule {}
