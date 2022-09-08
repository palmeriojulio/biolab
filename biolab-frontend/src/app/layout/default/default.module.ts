import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExameComponent } from './../../modules/exame/exame.component';
import { RequisicaoComponent } from './../../modules/requisicao/requisicao.component';
import { DefaultComponent } from './default.component';



@NgModule({
  declarations: [
    DefaultComponent,
    RequisicaoComponent,
    ExameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatProgressBarModule,
    MatTableModule
  ]
})
export class DefaultModule { }
