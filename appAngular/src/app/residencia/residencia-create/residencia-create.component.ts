import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-residencia-create',
  templateUrl: './residencia-create.component.html',
  styleUrls: ['./residencia-create.component.css'],
})
export class ResidenciaCreateComponent implements OnInit {
  urlImagen: any;
  residenciaForm: FormGroup;
  planCobroList: any;
  idResidencia: any;
  residenciaInfo: any;
  titleForm: string = 'Crear Residencia';
  isCreate: boolean = false;
  estadoList: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userList: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificacionService
  ) {
    this.formularioReactive();
    this.estadosList();
    this.usersList();
    this.planesCobroList();
  }

  ngOnInit(): void {
    this.residenciaInfo = null;
    this.route.params.subscribe((params: Params) => {
      this.idResidencia = params['id'];

      if (this.idResidencia != undefined) {
        this.isCreate = true;
        console.log(this.isCreate);
        this.titleForm = 'Actualizar Residencia';
        this.gService
          .get('residencia', this.idResidencia)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.residenciaInfo = data;
            this.residenciaForm.setValue({
              id: this.residenciaInfo.numResidencia,
              foto: this.residenciaInfo.foto,
              cantPersonas: this.residenciaInfo.cantPersonas,
              cantCarros: this.residenciaInfo.cantCarros,
              cantHabitaciones: this.residenciaInfo.cantHabitaciones,
              cantBannios: this.residenciaInfo.cantBannios,
              annioInicio: this.residenciaInfo.annioInicio,
              precio: this.residenciaInfo.precio,
              usuario: this.residenciaInfo.usuario.id,
              estado: this.residenciaInfo.estado.id,
              planCobro: this.residenciaInfo.deuda[0].idPlan_Cobro,
            });
          });
      }
    });
  }

  obtenerURLFoto() {
    let texto = document.getElementById('foto') as HTMLInputElement;
    this.urlImagen = texto.value;
  }

  //#region Validador Campos
  formularioReactive() {
    this.residenciaForm = this.fb.group({
      id: [null, null],
      foto: [
        null,
        Validators.compose([
          Validators.required,
          
        ]),
      ],
      cantPersonas: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      cantCarros: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      cantHabitaciones: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      cantBannios: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      annioInicio: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      precio: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      usuario: [null, Validators.required],
      estado: [null, Validators.required],
      planCobro: [null, Validators.required],
    });
  }
  //#endregion

  //#region  Lista Estados
  estadosList() {
    this.estadoList = null;
    this.gService
      .list('estadoResidencia')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Estados ', data);
        this.estadoList = data;
      });
  }
  //#endregion

  //#region Lista Usuarios
  usersList() {
    this.userList = null;

    this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Usuarios', data);
        this.userList = data.filter((item: any) => item.idRol === 2);
      });
  }
  //#endregion

  //#region Lista Rubros cobros
  planesCobroList() {
    this.planCobroList = null;

    this.gService
      .list('planCobro')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Planes Cobro', data);
        this.planCobroList = data;
      });
  }
  //#endregion

  //#region Crear Residencia
  crearResidencia() {
    let totalMontoRubros = 0;
    let idDeudaCreada: any;
    const fechaActual = new Date();
    const fechaActualToString = fechaActual.toLocaleDateString('es-CR');

    if (this.residenciaForm.invalid) {
      this.notification.mensaje(
        'Información Incompleta',
        'Por favor, llene los datos solicitados',
        TipoMessage.warning
      );
      return;
    }

    let montoTotal = parseInt(this.residenciaForm.value.precio);

    this.planCobroList.forEach((plan) => {
      plan.rubroCobro.forEach((rubro) => {
        if (plan.id == this.residenciaForm.value.planCobro) {
          totalMontoRubros += parseInt(rubro.monto);
        }
      });
    });

    montoTotal = totalMontoRubros;

    const dataDeuda = {
      monto: montoTotal,
      fecha: fechaActualToString,
      estado: 1,
      planCobro: parseInt(this.residenciaForm.value.planCobro),
    };

    const dataResidencia = {
      foto: this.residenciaForm.value.foto,
      cantPersonas: parseInt(this.residenciaForm.value.cantPersonas),
      cantCarros: parseInt(this.residenciaForm.value.cantPersonas),
      cantHabitaciones: parseInt(this.residenciaForm.value.cantHabitaciones),
      cantBannios: parseInt(this.residenciaForm.value.cantBannios),
      annioInicio: this.residenciaForm.value.annioInicio,
      precio: parseFloat(this.residenciaForm.value.precio),
      usuario: this.residenciaForm.value.usuario,
      estado: this.residenciaForm.value.estado,
    };

    this.gService
      .create('deuda', dataDeuda)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        idDeudaCreada = data.id;
        this.gService
          .create('residencia', { ...dataResidencia, deuda: idDeudaCreada })
          .pipe(takeUntil(this.destroy$))
          .subscribe((dataReserva: any) => {
            console.log(dataReserva);
            this.notification.mensaje(
              'Mensaje',
              'Residencia Guardada Exitosamente',
              TipoMessage.success
            );
            this.router.navigate(['residencia/all'], {
              queryParams: { create: 'true' },
            });
          });
      });
  }
  //#endregion

  //#region  Actualizar Residencia
  actualizar() {
    console.log(this.residenciaInfo.deuda[0].id);
    if (this.residenciaForm.invalid) {
      this.notification.mensaje(
        'Información Incompleta',
        'Por favor, llene los datos solicitados',
        TipoMessage.warning
      );
      return;
    }

    this.gService
      .update('residencia', {
        ...this.residenciaForm.value,
        deuda: this.residenciaInfo.deuda[0].id,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((dataReserva: any) => {
        console.log(dataReserva);
        this.notification.mensaje(
          'Mensaje',
          'Residencia Guardada Exitosamente',
          TipoMessage.success
        );
        this.router.navigate(['residencia/all'], {
          queryParams: { create: 'true' },
        });
      });
  }
  //#endregion
}
