import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';

@Component({
  selector: 'app-reservarareacomun-admin',
  templateUrl: './reservarareacomun-admin.component.html',
  styleUrls: ['./reservarareacomun-admin.component.css'],
})
export class ReservarareacomunAdminComponent implements OnInit {
  datos: any;
  datos2: any;
  datos3: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listEstados: any;
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns = ['foto', 'usuario', 'estado', 'acciones'];
  constructor(
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificacionService
  ) {
    this.listaReservas();
    this.listaEstados();
  }

  ngOnInit(): void {}

  listaReservas() {
    this.gService
      .list('reserva/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data.filter((item: any) => item.idEstado === 1);
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.datos2 = data.filter((item: any) => item.idEstado === 2);
        this.dataSource2 = new MatTableDataSource(this.datos2);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
        this.datos3 = data.filter((item: any) => item.idEstado === 3);
        this.dataSource3 = new MatTableDataSource(this.datos3);
        this.dataSource3.sort = this.sort;
        this.dataSource3.paginator = this.paginator;
      });
  }

  listaEstados() {
    this.listEstados = null;
    this.gService
      .list('estadoReserva')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.listEstados = data;
      });
  }

  updateEstado(id: any, estadoId: any) {
    let estadoData = {
      id: id,
      idEstado: estadoId === 'Aprobar' ? 2 : 3,
    };
    console.log(estadoData);
    this.gService
      .update('reserva', estadoData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.notification.mensaje(
          'Mensaje',
          'Estado actualizado exitosamente',
          TipoMessage.success
        );
        this.listaReservas();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
