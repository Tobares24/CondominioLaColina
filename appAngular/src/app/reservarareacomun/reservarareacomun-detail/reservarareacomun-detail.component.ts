import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reservarareacomun-detail',
  templateUrl: './reservarareacomun-detail.component.html',
  styleUrls: ['./reservarareacomun-detail.component.css'],
})
export class ReservarareacomunDetailComponent implements OnInit {
  datos: any;
  datos2: any;
  datos3: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private gService: GenericService
  ) {
    let id = route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerReservaByIdUser(Number(id));
    }
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => this.currentUser.next(x));
    this.authService.isAuthenticated.subscribe((valor) =>
      this.isAuthenticated.next(valor)
    );
  }

  convertirFecha(fecha) {
    var partes = fecha.split('/');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  obtenerReservaByIdUser(id: any) {
    this.gService
      .get('reserva/usuarios', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data.filter((item: any) => item.idEstado === 1);
        this.datos2 = data.filter((item: any) => item.idEstado === 2);
        this.datos3 = data.filter((item: any) => item.idEstado === 3);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
