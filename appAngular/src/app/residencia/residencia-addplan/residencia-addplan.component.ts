import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-residencia-addplan',
  templateUrl: './residencia-addplan.component.html',
  styleUrls: ['./residencia-addplan.component.css'],
})
export class ResidenciaAddplanComponent implements OnInit {
  datos: any;
  planList: any;
  planForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  columns = ['Número', 'Fecha', 'Plan', 'Total'];
  today = new Date().toISOString().slice(0, 10);
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NotificacionService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerResidencia(Number(id));
    }
    this.formularioReactive();
    this.planCobrosList();
  }

  ngOnInit(): void {}

  formularioReactive() {
    this.planForm = this.fb.group({
      id: [null, null],
      fecha: [null, Validators.required],
      planCobro: [null, Validators.required],
    });
  }

  obtenerResidencia(id: any) {
    this.gService
      .get('residencia', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  planCobrosList() {
    this.planList = null;
    this.gService
      .list('planCobro')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.planList = data;
      });
  }

  agregarPlan() {
    let fechaDeuda;
    let mesDeuda;
    let fechaToString;
    let totalMontoRubros = 0;
    let idResidencia = this.route.snapshot.paramMap.get('id');
    if (this.planForm.invalid) {
      this.notification.mensaje(
        'Error',
        'Campos inválidos y/o vacíos',
        TipoMessage.error
      );
      return;
    }
    let fecha = this.planForm.value.fecha;
    let mes = fecha.getMonth();
    for (let i = 0; i < this.datos.deuda.length; i++) {
      fechaDeuda = this.datos.deuda[i].fecha;
      fechaDeuda = new Date();
    }

    mesDeuda = fechaDeuda.getMonth();

    if (mesDeuda === mes) {
      this.notification.mensaje(
        'Advertencia',
        'No puede asignar más de 1 plan de cobro por mes, por favor seleccione un mes distinto',
        TipoMessage.warning
      );
      return;
    }

    this.planList.forEach((plan) => {
      plan.rubroCobro.forEach((rubro) => {
        if (plan.id == this.planForm.value.planCobro) {
          totalMontoRubros += parseInt(rubro.monto);
        }
      });
    });

    fechaToString = fecha.toLocaleDateString('es-CR');

    const dataDeuda = {
      monto: totalMontoRubros,
      fecha: fechaToString,
      estado: 1,
      planCobro: parseInt(this.planForm.value.planCobro),
      idResidencia: parseInt(idResidencia),
    };
    

    this.gService
      .create('deuda/nueva', dataDeuda)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['deuda/all'], {
          queryParams: { create: 'true' },
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
