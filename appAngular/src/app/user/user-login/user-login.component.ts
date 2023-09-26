import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  userExist: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    let auth = '';

    this.route.queryParams.subscribe((params) => {
      auth = params['auth'] || '';
      if (auth) {
        this.notification.mensaje(
          'Usuario',
          'Accesso denegado',
          TipoMessage.warning
        );
      }
    });
  }

  onReset() {
    this.formulario.reset();
  }

  getByEmail() {
    this.gService
      .get('usuario/get', this.formulario.value.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.userExist = data;
        console.log(this.userExist);
      });
  }

  submitForm() {
    this.makeSubmit = true;

    if (this.formulario.invalid) {
      return;
    }

    this.gService
      .get('usuario/get', this.formulario.value.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.userExist = data;

        console.log(this.userExist);
        if (this.userExist == null && this.userExist == undefined) {
          this.notification.mensaje(
            'Acceso denegado',
            'El usuario y/o contraseña son inválidos',
            TipoMessage.error
          );
          return;
        }

        if (this.userExist.idEstado == 2) {
          this.notification.mensaje(
            'Acceso denegado',
            'El usuario no está activo',
            TipoMessage.error
          );
          return;
        }

        this.authService
          .loginUser(this.formulario.value)
          .subscribe((response: any) => {
            if (response != false) {
              if (this.userExist.idRol == 1) {
                this.notification.mensaje(
                  'Inicio de Sesión',
                  '¡Bienvenido!',
                  TipoMessage.success
                );
                this.router.navigate(['/residencia/all']);
              } else {
                this.notification.mensaje(
                  'Inicio de Sesión',
                  '¡Bienvenido!',
                  TipoMessage.success
                );
                this.router.navigate(['/reserva']);
              }
            }
          });
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
