import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-informacion-all',
  templateUrl: './informacion-all.component.html',
  styleUrls: ['./informacion-all.component.css'],
})
export class InformacionAllComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  // Columnas que se muestran
  displayedColumns = ['id', 'usuario', 'tipoInfo', 'acciones'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.listadoNoticias();
  }

  ngOnInit(): void {}

  listadoNoticias() {
    this.gService
      .list('informacion/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalleResidencia(id: number) {
    this.router.navigate(['/informacion', id], {
      relativeTo: this.route,
    });
  }

  relativeToInformationCreate() {
    this.router.navigate(['/informacion/create'], {
      relativeTo: this.route,
    });
  }

  relativeToInformationUpdate(id: number) {
    this.router.navigate(['/informacion/update', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
