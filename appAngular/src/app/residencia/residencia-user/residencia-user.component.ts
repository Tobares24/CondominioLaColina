import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-residencia-user',
  templateUrl: './residencia-user.component.html',
  styleUrls: ['./residencia-user.component.css'],
})
export class ResidenciaUserComponent implements OnInit {
  datos: any;
  user: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  // Columnas que se muestran
  displayedColumns = ['foto', 'numResidencia', 'precio', 'acciones'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.listaResidencias();
  }

  ngOnInit(): void {}

  listaResidencias() {
    // Llamar al API, nombre de ruta
    let idUser = this.user.user.id;
    console.log(idUser);
    this.gService
      .get('residencia/usuarios', idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalleResidencia(id: any) {
    this.router.navigate(['residencia/', id]);
  }
}
