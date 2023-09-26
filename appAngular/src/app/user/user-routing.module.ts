import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { UserAllComponent } from './user-all/user-all.component';

const routes: Routes = [
  {
    path: 'usuario/registrar',
    component: UserCreateComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   id: '1',
    //   rol: ['admin'],
    // },
  },
  {
    path: 'usuario/all',
    component: UserAllComponent,
    canActivate: [AuthGuard],
    data: {
      id: '1',
      rol: ['admin'],
    },
  },
  {
    path: 'usuario/login',
    component: UserLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
