import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-reservarareacomun-form',
  templateUrl: './reservarareacomun-form.component.html',
  styleUrls: ['./reservarareacomun-form.component.css'],
})
export class ReservarareacomunFormComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isDisable: boolean = false;
  repetidos = [];
  horariosAreaCom = [];
  idsHR = [];
  noHayOpciones: boolean = false;
  selectedItems = [];
  disableButton: boolean = true;
  selectedHourIds: number[] = [];
  currentUser: any;
  idAreaComun: any;
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.idAreaComun = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(this.idAreaComun))) {
      this.obtenerAreaComun(Number(this.idAreaComun));
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {}

  obtenerAreaComun(id: any) {
    this.gService
      .get('areaComun', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.obtenerReservas(this.datos);
      });
  }

  obtenerReservas(datos) {
    this.gService
      .list('reserva/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.obtenerHorariosReservados(data, datos);
      });
  }

  obtenerHorariosReservados(reservas: any, hAreaComun: any) {
    let idAreaComun = [];
    let arrHorariosReserva = [];

    hAreaComun.horario.find((obj) => {
      this.horariosAreaCom.push(obj);
    });

    for (let i of reservas) {
      arrHorariosReserva.push(i.horario);
    }

    for (let i = 0; i < arrHorariosReserva.length; i++) {
      for (let j = 0; j < arrHorariosReserva[i].length; j++) {
        this.idsHR.push(arrHorariosReserva[i][j].id);
      }
    }

    for (let i = 0; i < this.horariosAreaCom.length; i++) {
      idAreaComun.push(this.horariosAreaCom[i].id);
    }

    const setAreaComun = new Set(idAreaComun);
    this.repetidos = this.idsHR.filter((id) => setAreaComun.has(id));
  }

  getIcons(itemId: number): string[] {
    const icons = [];
    this.repetidos.length;
    for (let i = 0; i < this.repetidos.length; i++) {}
    return icons;
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  isDisabled(item: any): boolean {
    return this.repetidos.includes(item.id);
  }

  toggleSelected(item: any): void {
    if (this.isDisabled(item)) {
      return;
    }

    const id = item.id;
    const index = this.selectedHourIds.indexOf(id);

    if (index >= 0) {
      // El mat-chip ya está seleccionado, eliminarlo de ambos arreglos
      this.selectedItems.splice(index, 1);
      this.selectedHourIds.splice(index, 1);
    } else {
      // El mat-chip no está seleccionado, agregarlo a selectedItems
      this.selectedItems.push(item);
    }

    // Actualizar selectedHourIds solo con los ID seleccionados
    this.selectedHourIds = [];
    this.selectedItems.forEach((i) => {
      if (i.id > 0) {
        this.selectedHourIds.push(i.id);
      }
    });
    this.disableButton = this.selectedItems.length === 0;
  }

  createReservation() {
    let gFormat: any = this.selectedHourIds.map((id) => ({ id }));
    const reservaData = {
      idAreaComun: Number(this.idAreaComun),
      idEstado: 1,
      idUsuario: this.currentUser.user.id,
      horario: gFormat,
    };
    this.gService
      .create('reserva', reservaData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/reserva'], {
          queryParams: { create: 'true' },
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
