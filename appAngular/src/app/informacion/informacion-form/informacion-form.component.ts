import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-informacion-form',
  templateUrl: './informacion-form.component.html',
  styleUrls: ['./informacion-form.component.css'],
})
export class InformacionFormComponent implements OnInit {
  informacionForm: FormGroup;
  tipoInformacionList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idInformacion: number = 0;
  titleForm: string = 'Crear Información';
  informacioinInfo: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaTiposInfo();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idInformacion = params['id'];

      if (this.idInformacion != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar Información';

        this.gService
          .get('informacion', this.idInformacion)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.informacioinInfo = data;
            this.informacionForm.setValue({
              id: this.informacioinInfo.id,
              foto: this.informacioinInfo.foto,
              descripcion: this.informacioinInfo.descripcion,
              asunto: this.informacioinInfo.asunto,
              fecha: this.informacioinInfo.fecha,
              tipoInformacion: this.informacioinInfo.tipoInformacion.id,
            });
          });
      }
    });
  }

  formularioReactive() {
    this.informacionForm = this.fb.group({
      id: [null, null],
      foto: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^https?://[w-]+(.[w-]+)+[/#?]?.*$'),
        ]),
      ],
      descripcion: [null, Validators.compose([Validators.required])],
      asunto: [null, Validators.compose([Validators.required])],
      fecha: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '([0-3])?[0-9]{1}(/|-|.){1}([0-2])?[0-9]{1}(/|-|.){1}[0-9]{2,4}'
          ),
        ]),
      ],
      tipoInformacion: [null, Validators.required],
    });
  }

  listaTiposInfo() {
    this.tipoInformacionList = null;
    this.gService
      .list('tipoInfo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tipoInformacionList = data;
      });
  }

  crearInfo() {
    if (this.informacionForm.invalid) {
      console.log('Error en envío de información');
      return;
    }

    console.log(this.informacionForm.value);

    console.log('Información del form: ', this.informacionForm.value);

    this.gService
      .create('informacion', this.informacionForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Información de la data enviada: ', data);
        this.router.navigate(['/informacion/all']);
      });
  }

  actualizarInfo() {
    if (this.informacionForm.invalid) {
      console.log('Error en envío de información');
      return;
    }

    console.log(this.informacionForm.value);

    console.log('Información del form: ', this.informacionForm.value);

    this.gService
      .update('informacion', this.informacionForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Información de la data enviada: ', data);
        this.router.navigate(['/informacion/all']);
      });
  }
}
