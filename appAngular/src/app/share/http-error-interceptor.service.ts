import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { NotificacionService, TipoMessage } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private noti: NotificacionService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = null;
    if (this.auth.currentUserValue != null) {
      token = this.auth.currentUserValue.token;
    }
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token),
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = '';
        switch (error.status) {
          case 400:
            message = 'Solicitud incorrecta';
            break;
          case 401:
            message = 'No autorizado';
            break;
          case 403:
            message = 'Acceso denegado';
            break;
          case 422:
            message = 'Entidad no procesable';
            break;
        }
        this.noti.mensaje(
          'Error',
          '' + ' ' + message,
          TipoMessage.error
        );
        throw new Error(error.message);
      })
    );
  }
}
