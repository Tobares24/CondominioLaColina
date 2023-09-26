import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciaAllComponent } from './incidencia-all/incidencia-all.component';
import { IncidenciaCreateComponent } from './incidencia-create/incidencia-create.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { IncidenciaUserComponent } from './incidencia-user/incidencia-user.component';

const routes: Routes = [
  {
    path: 'incidencia/all',
    component: IncidenciaAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'incidencia/usuario',
    component: IncidenciaUserComponent,
    canActivate: [AuthGuard],
    data: {
      id: '2',
      rol: ['residente'],
    },
  },
  {
    path: 'incidencia/create',
    component: IncidenciaCreateComponent,
    canActivate: [AuthGuard],
    data: {
      id: '2',
      rol: ['residente'],
    },
  },
  {
    path: 'incidencia/update/:id',
    component: IncidenciaCreateComponent,
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
export class IncidenciaRoutingModule {}
