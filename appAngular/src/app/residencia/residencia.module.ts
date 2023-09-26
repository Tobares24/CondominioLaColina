import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidenciaRoutingModule } from './residencia-routing.module';
import { ResidenciaAllComponent } from './residencia-all/residencia-all.component';
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
import { ResidenciaDetailComponent } from './residencia-detail/residencia-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ResidenciaCreateComponent } from './residencia-create/residencia-create.component';
import { ResidenciaAddplanComponent } from './residencia-addplan/residencia-addplan.component';
import { ResidenciaUserComponent } from './residencia-user/residencia-user.component';
@NgModule({
  declarations: [
    ResidenciaAllComponent,
    ResidenciaDetailComponent,
    ResidenciaCreateComponent,
    ResidenciaAddplanComponent,
    ResidenciaUserComponent,
  ],
  imports: [
    CommonModule,
    ResidenciaRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ResidenciaModule {}
