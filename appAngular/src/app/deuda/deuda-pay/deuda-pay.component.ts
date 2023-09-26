import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-deuda-pay',
  templateUrl: './deuda-pay.component.html',
  styleUrls: ['./deuda-pay.component.css'],
})
export class DeudaPayComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificacionService
  ) {}

  ngOnInit(): void {}

  updateEstado() {
    let id = this.route.snapshot.paramMap.get('id');
    let user = JSON.parse(localStorage.getItem('currentUser')).user;
    console.log(user.id);
    let estadoData = {
      id: parseInt(id),
      idEstado: 2,
    };
    console.log(estadoData);
    this.gService
      .update('deuda/estado', estadoData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.notification.mensaje(
          'Mensaje',
          'Pago efectuado exitosamente',
          TipoMessage.success
        );
        if (user.idRol === 2) {
          this.router.navigate(['/deuda/usuarios', user.id], {
            queryParams: { create: 'true' },
          });
        } else {
          this.router.navigate(['/deuda/all'], {
            queryParams: { create: 'true' },
          });
        }
      });
  }
}
