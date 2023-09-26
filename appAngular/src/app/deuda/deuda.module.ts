import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeudaRoutingModule } from './deuda-routing.module';
import { DeudaAllComponent } from './deuda-all/deuda-all.component';
import { DeudaDetailComponent } from './deuda-detail/deuda-detail.component';
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
import { DeudaByuserComponent } from './deuda-byuser/deuda-byuser.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DeudaPayComponent } from './deuda-pay/deuda-pay.component';

@NgModule({
  declarations: [
    DeudaAllComponent,
    DeudaDetailComponent,
    DeudaByuserComponent,
    DeudaPayComponent
  ],
  imports: [
    CommonModule,
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
    DeudaRoutingModule,
    MatTabsModule,
    MatTooltipModule
  ]
})
export class DeudaModule { }