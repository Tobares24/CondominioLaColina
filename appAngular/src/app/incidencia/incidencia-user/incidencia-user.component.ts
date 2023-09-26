import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-incidencia-user',
  templateUrl: './incidencia-user.component.html',
  styleUrls: ['./incidencia-user.component.css'],
})
export class IncidenciaUserComponent implements OnInit {
  user: any;
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
  displayedColumns = ['id', 'descripcion', 'estado'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
    this.listMisIncidencias();
  }

  ngOnInit(): void {}

  listMisIncidencias() {
    console.log(this.user.id);
    this.gService
      .get('incidencia/usuario', Number(this.user.id))
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

  crearIncidencia() {
    this.router.navigate(['incidencia/create']);
  }
}
