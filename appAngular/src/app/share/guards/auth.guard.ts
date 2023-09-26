import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;
  currentUser: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    //Subscribirse para obtener si esta autenticado
    this.authService.isAuthenticated
      .pipe(shareReplay({ bufferSize: 1, refCount: true }))
      .subscribe((valor) => (this.isAuthenticated = valor));

    //Subscribirse para obtener el usuario autenticado
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }
  //Verificar que el rol del usuario coincida
  //con alguno de los indicados
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.isAuthenticated) {
      const userRole = this.currentUser.user.idRol;
      //roles.length && roles.indexOf(verify.role)===-1
      if (route.data['rol'].length && route.data['rol'].includes(userRole)) {
        console.log('no sirve');
        this.router.navigate(['/usuario/login'], {
          // Parametro para mostrar mensaje en login
          queryParams: { auth: 'no' },
        });
        return false;
      }
      return true;
    }

    this.router.navigate(['/usuario/login'], {
      queryParams: { auth: 'no' },
    });
    return false;
  }
}