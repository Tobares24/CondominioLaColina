import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanCobroDetailComponent } from './plan-cobro-detail/plan-cobro-detail.component';
import { PlancobroAllComponent } from './plancobro-all/plancobro-all.component';
import { PlancobroFormComponent } from './plancobro-form/plancobro-form.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {
    path: 'planCobro/all',
    component: PlancobroAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'planCobro/create',
    component: PlancobroFormComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'planCobro/:id',
    component: PlanCobroDetailComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'planCobro/update/:id',
    component: PlancobroFormComponent,
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
export class PlancobroRoutingModule {}
