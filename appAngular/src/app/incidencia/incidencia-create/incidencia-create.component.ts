import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { TipoMessage } from 'src/app/share/notification.service';
import { NotificacionService } from '../../share/notification.service';

@Component({
  selector: 'app-incidencia-create',
  templateUrl: './incidencia-create.component.html',
  styleUrls: ['./incidencia-create.component.css'],
})
export class IncidenciaCreateComponent implements OnInit {
  incidenciaForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idIncidencia: number = 0;
  titleForm: string = 'Crear';
  incidenciaInfo: any;
  estados: any;
  user: any;
  makeSubmit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificacionService
  ) {
    this.formularioReactive();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {}

  //Crear el formulario
  formularioReactive() {
    this.incidenciaForm = this.fb.group({
      descripcion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(200),
        ]),
      ],
    });
  }

  //Crear incidencia
  crearIncidencia() {
    this.makeSubmit = true;
    if (this.incidenciaForm.invalid) {
      return;
    }

    console.log(this.incidenciaForm.value);

    //Llamar al API y enviar la informacion
    this.gService
      .create('incidencia', {
        ...this.incidenciaForm.value,
        user: this.user.user.id,
        estado: 1,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/incidencia/usuario'], {
          queryParams: { create: 'true' },
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
