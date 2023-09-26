import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidenciaAllComponent } from './residencia-all/residencia-all.component';
import { ResidenciaDetailComponent } from './residencia-detail/residencia-detail.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { ResidenciaCreateComponent } from './residencia-create/residencia-create.component';
import { ResidenciaAddplanComponent } from './residencia-addplan/residencia-addplan.component';
import { ResidenciaUserComponent } from './residencia-user/residencia-user.component';

const routes: Routes = [
  {
    path: 'residencia/all',
    component: ResidenciaAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },

  {
    path: 'residencia/usuarios/:id',
    component: ResidenciaUserComponent,
    canActivate: [AuthGuard],
    data: {
      id: ['1', '2'],
      rol: ['admin'],
    },
  },

  {
    path: 'residencia/update/:id',
    component: ResidenciaCreateComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },

  {
    path: 'residencia/:id',
    component: ResidenciaDetailComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },

  {
    path: 'residencia/addplan/:id',
    component: ResidenciaAddplanComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },

  {
    path: 'residencia',
    component: ResidenciaCreateComponent,
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
export class ResidenciaRoutingModule {}
