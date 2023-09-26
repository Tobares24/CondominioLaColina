import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-plancobro-form',
  templateUrl: './plancobro-form.component.html',
  styleUrls: ['./plancobro-form.component.css'],
})
export class PlancobroFormComponent implements OnInit {
  plancobroForm: FormGroup;
  rubroCobrosList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idPlanCobro: number = 0;
  titleForm: string = 'Crear Plan de Cobro';
  plancobroInfo: any;
  total: number = 0;
  montos = [];

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaRubroCobros();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPlanCobro = params['id'];

      if (this.idPlanCobro != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar Plan de Cobro';

        this.gService
          .get('planCobro', this.idPlanCobro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.plancobroInfo = data;
            this.plancobroForm.setValue({
              id: this.plancobroInfo.id,
              descripcion: this.plancobroInfo.descripcion,
              rubroCobro: this.plancobroInfo.rubroCobro.map(({ id }) => id),
            });
          });
      }
    });
  }

  formularioReactive() {
    this.plancobroForm = this.fb.group({
      id: [null, null],
      descripcion: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      rubroCobro: [null, Validators.required],
    });
  }

  listaRubroCobros() {
    this.rubroCobrosList = null;
    this.gService
      .list('rubroCobro')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.rubroCobrosList = data;
      });
  }

  sumaMontoRubroCobro(monto) {
    this.montos.push(monto);
    const arrOfNum = this.montos.map((str) => {
      return parseInt(str, 10);
    });
    let suma = 0;
    for (let item in arrOfNum) {
      suma += arrOfNum[item];
    }
    this.total = suma;
    console.log(this.total);
  }

  montosSeleccionados: number[] = [];

  onMontosSelectionChange(event: MatOptionSelectionChange) {
    // const selectedMontos = event.source.value as number[];

    // const addedMontos = selectedMontos.filter(
    //   (m) => !this.montosSeleccionados.includes(m)
    // );
    // for (const m of addedMontos) {
    //   console.log(true);
    // }

    // const removedMontos = this.montosSeleccionados.filter(
    //   (m) => !selectedMontos.includes(m)
    // );
    // for (const m of removedMontos) {
    //   console.log(false);
    // }

    // this.montosSeleccionados = selectedMontos;
  }

  crearPlanCobro() {
    if (this.plancobroForm.invalid) {
      return;
    }
    console.log(this.plancobroForm.value);
    let rFormat: any = this.plancobroForm
      .get('rubroCobro')
      .value.map((x) => ({ ['id']: x }));
    this.plancobroForm.patchValue({ rubroCobro: rFormat });
    console.log(this.plancobroForm.value);
    this.gService
      .create('planCobro', this.plancobroForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/planCobro/all'], {
          queryParams: { create: 'true' },
        });
      });
  }

  actualizarPlanCobro() {
    if (this.plancobroForm.invalid) {
      return;
    }
    let rFormat: any = this.plancobroForm
      .get('rubroCobro')
      .value.map((x) => ({ ['id']: x }));
    this.plancobroForm.patchValue({ rubroCobro: rFormat });
    console.log(this.plancobroForm.value);
    this.gService
      .update('planCobro', this.plancobroForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/planCobro/all'], {
          queryParams: { create: 'true' },
        });
      });
  }
}
