import { ExameComponent } from './modules/exame/exame.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layout/default/default.component';
import { RequisicaoComponent } from './modules/requisicao/requisicao.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children:  [{
    path: '',
    component: RequisicaoComponent
  }, {
    path: 'exame',
    component: ExameComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
