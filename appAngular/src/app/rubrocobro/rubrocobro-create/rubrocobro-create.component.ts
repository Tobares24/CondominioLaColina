import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-rubrocobro-create',
  templateUrl: './rubrocobro-create.component.html',
  styleUrls: ['./rubrocobro-create.component.css'],
})
export class RubrocobroCreateComponent implements OnInit {
  rubroForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idRubro: number = 0;
  titleForm: string = 'Crear';
  rubroInfo: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.route.params.subscribe((params: Params) => {
      this.idRubro = params['id'];

      if (this.idRubro != undefined) {
        this.isCreate = false;
        console.log(this.isCreate);
        this.titleForm = 'Actualizar';

        //Obtener incidencia a actualizar del API
        this.gService
          .get('rubroCobro', this.idRubro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.rubroInfo = data;
            this.rubroForm.setValue({
              id: this.rubroInfo.id,
              descripcion: this.rubroInfo.descripcion,
              monto: this.rubroInfo.monto,
            });
          });
      }
    });
  }

  //Crear el formulario
  formularioReactive() {
    this.rubroForm = this.fb.group({
      id: [null, null],
      descripcion: [
        null,
        
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
      ],
      monto: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
    });
  }

  //Crear rubro cobro
  crearRubro() {
    if (this.rubroForm.invalid) {
      return;
    }

    console.log(this.rubroForm.value);

    //Llamar al API y enviar la informacion
    this.gService
      .create('rubroCobro', this.rubroForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/rubroCobro/all'], {
          queryParams: { create: 'true' },
        });
      });
  }

  //Actualizar rubro cobro
  actualizarRubro() {
    //Verificar validación
    if (this.rubroForm.invalid) {
      return;
    }

    console.log(this.rubroForm.value);

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('rubroCobro', this.rubroForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.router.navigate(['/rubroCobro/all'], {
          queryParams: { update: 'true' },
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
