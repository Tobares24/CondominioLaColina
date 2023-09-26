import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
export enum TipoMessage{
  error,
  info,
  success,
  warning,
}
@Injectable({
  providedIn: 'root',
})

export class NotificacionService {
  options: IndividualConfig;
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;

    //Habilitar formato HTML dentro de la notificación
    this.options.enableHtml = true;

    /* Top Right, Bottom Right, Bottom Left, Top Left, Top Full Width, Bottom Full Width, Top Center, Bottom Center */
    this.options.positionClass = 'toast-top-center';
    //Tiempo que se presenta el mensaje
    // this.options.timeOut = 5000;
    this.options.disableTimeOut = true;
    this.options.closeButton = true;
  }
  /*
Presentar mensaje de notificación
Toast Type: success, info, warning, error
 */
  public mensaje(titulo: string, mensaje: string, tipo:TipoMessage) {
    this.toastr.show(mensaje, titulo, this.options, 'toast-'+TipoMessage[tipo]);
 
  }
  
}
