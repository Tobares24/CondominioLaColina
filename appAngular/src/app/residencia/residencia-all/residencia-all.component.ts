import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-residencia-all',
  templateUrl: './residencia-all.component.html',
  styleUrls: ['./residencia-all.component.css'],
})
export class ResidenciaAllComponent implements AfterViewInit {
  datos: any;
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
  ) {}

  ngAfterViewInit(): void {
    this.listaResidencias();
  }

  listaResidencias() {
    // Llamar al API, nombre de ruta
    this.gService
      .list('residencia/')
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
    this.router.navigate(['/residencia', id], {
      relativeTo: this.route,
    });
  }

  crearResidencia() {
    this.router.navigate(['/residencia'], {
      relativeTo: this.route,
    });
  }

  actualizarResidencia(id: any) {
    this.router.navigate(['/residencia/update', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
