import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarareacomunRoutingModule } from './reservarareacomun-routing.module';
import { ReservarareacomunIndexComponent } from './reservarareacomun-index/reservarareacomun-index.component';
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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservarareacomunFormComponent } from './reservarareacomun-form/reservarareacomun-form.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { FilterPipe } from '../share/FilterPipe';
import { ReservarareacomunDetailComponent } from './reservarareacomun-detail/reservarareacomun-detail.component';
import { ReservarareacomunAdminComponent } from './reservarareacomun-admin/reservarareacomun-admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ReservarareacomunIndexComponent,
    ReservarareacomunFormComponent,
    FilterPipe,
    ReservarareacomunDetailComponent,
    ReservarareacomunAdminComponent,
  ],
  imports: [
    CommonModule,
    ReservarareacomunRoutingModule,
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
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  exports: [FilterPipe],
})
export class ReservarareacomunModule {}
