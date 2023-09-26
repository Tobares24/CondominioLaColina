import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubrocobroAllComponent } from './rubrocobro-all/rubrocobro-all.component';
import { RubrocobroCreateComponent } from './rubrocobro-create/rubrocobro-create.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {
    path: 'rubroCobro/all',
    component: RubrocobroAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'rubroCobro/create',
    component: RubrocobroCreateComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'rubroCobro/update/:id',
    component: RubrocobroCreateComponent,
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
export class RubrocobroRoutingModule {}
