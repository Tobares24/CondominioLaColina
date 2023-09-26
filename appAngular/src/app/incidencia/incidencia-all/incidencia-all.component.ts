import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-incidencia-all',
  templateUrl: './incidencia-all.component.html',
  styleUrls: ['./incidencia-all.component.css'],
})
export class IncidenciaAllComponent implements AfterViewInit {
  datos: any;
  datos2: any;
  datos3: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();

  // Columnas que se muestran
  displayedColumns = ['id', 'descripcion', 'estado', 'usuario', 'acciones'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificacionService
  ) {}

  ngAfterViewInit(): void {
    this.listaIncidencias();
  }

  listaIncidencias() {
    // Llamar al API, nombre de ruta
    this.gService
      .list('incidencia/')
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
        
        console.log(this.datos);
      });
  }

  crearIncidencia() {
    this.router.navigate(['/incidencia/create'], {
      relativeTo: this.route,
    });
  }
  updateEstado(id: any, estadoId: any) {
    let estadoData = {
      id: id,
      idEstado: estadoId == 1 ? 2 : estadoId == 2 ? 3 : 1,
    };
    console.log(estadoData);
    this.gService
      .update('incidencia', estadoData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.notification.mensaje(
          'Mensaje',
          'Estado actualizado exitosamente',
          TipoMessage.success
        );
        this.listaIncidencias();
      });
  }

  detalleIncidencia(id: number) {
    this.router.navigate(['/incidencia', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
