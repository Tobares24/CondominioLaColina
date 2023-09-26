import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-residencia-detail',
  templateUrl: './residencia-detail.component.html',
  styleUrls: ['./residencia-detail.component.css'],
})
export class ResidenciaDetailComponent implements OnInit {
  datos: any;
  user: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  columns = [
    'Número',
    'Cantidad de personas',
    'Cocheras',
    'Habitaciones',
    'Baños',
    'Año de inicio',
    'Precio',
    'Propietario',
    'Estado',
  ];

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Obtener un valor de la url
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerResidencia(Number(id));
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {}

  obtenerResidencia(id: any) {
    this.gService
      .get('residencia', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        console.log(this.datos);
      });
  }

  agregarPlanCobro() {
    let id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/residencia/addplan', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
