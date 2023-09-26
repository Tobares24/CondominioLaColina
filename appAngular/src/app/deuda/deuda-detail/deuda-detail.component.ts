import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-deuda-detail',
  templateUrl: './deuda-detail.component.html',
  styleUrls: ['./deuda-detail.component.css'],
})
export class DeudaDetailComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  columns = ['Número', 'Fecha', 'Plan', 'Total', 'Acciones'];

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Obtener un valor de la url
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerDeuda(Number(id));
    }
  }

  ngOnInit(): void {}

  obtenerDeuda(id: any) {
    this.gService
      .get('residencia', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  pagarDeuda(id: any) {
    this.router.navigate(['deuda/pay', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
