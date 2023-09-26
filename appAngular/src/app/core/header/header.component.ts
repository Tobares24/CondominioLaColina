import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  debugger;
  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  showFiller = false;
  userA: any;
  public isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.userA = JSON.parse(localStorage.getItem('currentUser'));
    if (this.userA != null) {
      this.currentUser.next(this.userA.user);
    }
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => this.currentUser.next(x));
    this.authService.isAuthenticated.subscribe((valor) =>
      this.isAuthenticated.next(valor)
    );
  }

  reservarArea() {
    this.router.navigate(['reserva']);
  }
  misReservaciones() {
    console.log(this.currentUser.value.user.id);
    let id = Number(this.currentUser.value.user.id);
    this.router.navigate(['reserva/usuarios/', id]);
  }

  informacion() {
    this.router.navigate(['informacion/all']);
  }

  deudas() {
    this.router.navigate(['deuda/all']);
  }

  misResidencias(){
    let id = Number(this.currentUser.value.user.id);
    this.router.navigate(['residencia/usuarios/', id]);
  }

  crearIncidencia(){
    this.router.navigate(['incidencia/create']);
  }

  misDeudas() {
    let id = Number(this.currentUser.value.user.id);
    this.router.navigate(['deuda/usuarios/', id]);
  }

  planesCobro() {
    this.router.navigate(['planCobro/all']);
  }

  rubrosCobro() {
    this.router.navigate(['rubroCobro/all']);
  }

  login() {
    this.router.navigate(['usuario/login']);
  }

  residencias() {
    this.router.navigate(['residencia/all']);
  }

  areasReservadas() {
    this.router.navigate(['reserva/all']);
  }

  areasComunes() {
    this.router.navigate(['areaComun/all']);
  }

  incidencias() {
    this.router.navigate(['incidencia/all']);
  }

  users() {
    this.router.navigate(['usuario/all']);
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated.next(false);
    this.router.navigate(['usuario/login']);
  }
}
