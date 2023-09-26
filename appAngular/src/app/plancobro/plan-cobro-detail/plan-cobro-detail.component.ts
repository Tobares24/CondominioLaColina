import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-plan-cobro-detail',
  templateUrl: './plan-cobro-detail.component.html',
  styleUrls: ['./plan-cobro-detail.component.css'],
})

export class PlanCobroDetailComponent implements OnInit {
  datos: any;
  suma: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  columns = ['Código', 'Descripción', 'Monto'];
  constructor(
    private gService: GenericService,
    private router: ActivatedRoute
  ) {
    // Obtener un valor de la url
    let id = this.router.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerPlanCobro(Number(id));
    }
  }

  ngOnInit(): void {}

  obtenerPlanCobro(id: any) {
    this.gService
      .get('planCobro', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
