import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reservarareacomun-index',
  templateUrl: './reservarareacomun-index.component.html',
  styleUrls: ['./reservarareacomun-index.component.css'],
})
export class ReservarareacomunIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notification: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.listaAreaComunes();
  }

  ngOnInit(): void {}

  listaAreaComunes() {
    this.gService
      .list('areaComun/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  reservar(id: number){
    this.router.navigate(['/reserva/create', id], {
      relativeTo: this.route,
    });
  }
}
