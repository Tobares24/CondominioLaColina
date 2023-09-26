import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreacomunRoutingModule } from './areacomun-routing.module';
import { AreacomunAllComponent } from './areacomun-all/areacomun-all.component';


@NgModule({
  declarations: [
    AreacomunAllComponent
  ],
  imports: [
    CommonModule,
    AreacomunRoutingModule
  ]
})
export class AreacomunModule { }
