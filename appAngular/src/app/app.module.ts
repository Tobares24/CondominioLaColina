import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ResidenciaModule } from './residencia/residencia.module';
import { PlancobroModule } from './plancobro/plancobro.module';
import { DeudaModule } from './deuda/deuda.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InformacionModule } from './informacion/informacion.module';
import { IncidenciaModule } from './incidencia/incidencia.module';
import { RubrocobroModule } from './rubrocobro/rubrocobro.module';
import { ReservarareacomunModule } from './reservarareacomun/reservarareacomun.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { HorarioModule } from './horario/horario.module';
import { AreacomunModule } from './areacomun/areacomun.module';
import { ReporteModule } from './reporte/reporte.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    ResidenciaModule,
    PlancobroModule,
    DeudaModule,
    NgbModule,
    InformacionModule,
    IncidenciaModule,
    RubrocobroModule,
    ReservarareacomunModule,
    HorarioModule,
    AreacomunModule,
    ReporteModule,
    // Siempre va de último
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
