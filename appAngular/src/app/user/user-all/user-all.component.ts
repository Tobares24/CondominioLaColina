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
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css'],
})
export class UserAllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre', 'email', 'estado', 'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificacionService
  ) {
    this.listaUsuarios();
  }

  ngAfterViewInit(): void {}

  listaUsuarios() {
    // Llamar al API, nombre de ruta
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('usuarios:', data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  crearUsuario() {
    this.router.navigate(['/usuario/registrar'], {
      relativeTo: this.route,
    });
  }

  updateEstado(id: any, estadoId: any) {
    let estadoData = { id: id, idEstado: estadoId == 1 ? 2 : 1 };
    console.log(estadoData);
    this.gService
      .update('usuario', estadoData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.notification.mensaje(
          'Mensaje',
          'Usuario actualizado exitosamente',
          TipoMessage.success
        );
        this.listaUsuarios();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
