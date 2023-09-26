import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-deuda-byuser',
  templateUrl: './deuda-byuser.component.html',
  styleUrls: ['./deuda-byuser.component.css'],
})
export class DeudaByuserComponent implements OnInit {
  user: any;
  datos: any;
  datos2: any;
  descripcion: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  displayedColumns = ['numResidencia', 'nombre', 'acciones'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
    this.listMisDeudas();
  }

  ngOnInit(): void {}

  listMisDeudas() {
    this.gService
      .get('residencia/usuarios', Number(this.user.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }


  detalleDeuda(id: any) {
    this.router.navigate(['/deuda', id], {
      relativeTo: this.route,
    });
  }
}
