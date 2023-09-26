import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.css'],
})
export class HorarioFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  horarioForm: FormGroup;
  fechaSeleccionada: any;
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  crear() {
    this.gService
      .create('horario', this.horarioForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Información de la data enviada: ', data);
      });
  }

}
