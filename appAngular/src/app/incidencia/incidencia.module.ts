import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidenciaRoutingModule } from './incidencia-routing.module';
import { IncidenciaAllComponent } from './incidencia-all/incidencia-all.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IncidenciaCreateComponent } from './incidencia-create/incidencia-create.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { IncidenciaUserComponent } from './incidencia-user/incidencia-user.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    IncidenciaAllComponent,
    IncidenciaCreateComponent,
    IncidenciaUserComponent,
  ],
  imports: [
    CommonModule,
    IncidenciaRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
})
export class IncidenciaModule {}
