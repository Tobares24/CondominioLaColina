import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  ServerUrl = environment.apiURL;

  private currentUserSubject: BehaviorSubject<any>;

  public currentUser: Observable<any>;

  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currrentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  get isAuthenticated() {
    if (this.currentUserValue != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.ServerUrl + 'usuario/registrar', user);
  }

  loginUser(user: any): Observable<any> {
    try {
      return this.http.post<any>(this.ServerUrl + 'usuario/login', user).pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.authenticated.next(true);
          this.currentUserSubject.next(user.data);
          return user;
        })
      );
    } catch (error) {
      console.error(error);
      return throwError('Ocurrió un error al iniciar sesión');
    }
  }

  logout() {
    let usuario = this.currentUserSubject;
    if (usuario) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.authenticated.next(false);
      return true;
    }
    return false;
  }
}
function throwError(arg0: string): Observable<any> {
  throw new Error('Function not implemented.');
}
