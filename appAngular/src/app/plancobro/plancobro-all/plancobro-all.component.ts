import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-plancobro-all',
  templateUrl: './plancobro-all.component.html',
  styleUrls: ['./plancobro-all.component.css'],
})
export class PlancobroAllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  // Columnas que se muestran
  displayedColumns = ['id', 'descripcion', 'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngAfterViewInit(): void {
    this.listaPlanesCobro();
  }

  listaPlanesCobro() {
    // Llamar al API, nombre de ruta
    this.gService
      .list('planCobro/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detallePlanCobro(id: number) {
    this.router.navigate(['/planCobro', id], {
      relativeTo: this.route,
    });
  }

  crearPlanCobro() {
    this.router.navigate(['/planCobro/create'], {
      relativeTo: this.route,
    });
  }

  actualizarPlanCobro(id: number) {
    this.router.navigate(['/planCobro/update', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
