import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  hide = true;
  titleForm: string = 'Crear';
  rolesList: any;
  estadosList: any;
  makeSubmit: boolean = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notification: NotificacionService
  ) {
    this.formularioReactive();
    this.listaRoles();
    this.listaEstadoUsuario();
  }

  ngOnInit(): void {}

  formularioReactive() {
    this.userForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(191),
        ]),
      ],
      primerApellido: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(191),
        ]),
      ],
      segundoApellido: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(191),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(20),
          Validators.maxLength(191),
        ]),
      ],
      clave: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(191),
        ]),
      ],
      rol: [null, Validators.required],
      estado: [null, Validators.required],
    });
  }

  listaRoles() {
    this.rolesList = null;
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.rolesList = data;
      });
  }

  listaEstadoUsuario() {
    this.estadosList = null;
    this.gService
      .list('estadoUsuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.estadosList = data;
      });
  }

  submitForm() {
    this.makeSubmit = true;
    console.log(this.userForm.value);
    // if (this.userForm.invalid) {
    //   this.notification.mensaje(
    //     'Usuario',
    //     'Llene los campos solictados',
    //     TipoMessage.warning
    //   );
    //   return;
    // }

    this.authService
      .createUser(this.userForm.value)
      .subscribe((respuesta: any) => {
        this.user = respuesta;
        this.router.navigate(['usuario/all'], {
          //Mostrar un mensaje
          queryParams: { register: 'true' },
        });
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.userForm.controls[control].hasError(error) &&
      this.userForm.controls[control].invalid &&
      (this.makeSubmit || this.userForm.controls[control].touched)
    );
  };
}
