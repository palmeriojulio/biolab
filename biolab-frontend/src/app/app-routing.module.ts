import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layout/default/default.component';
import { ExameFormComponent } from './modules/exame-form/exame-form.component';
import { ExameComponent } from './modules/exame/exame.component';
import { PessoaComponent } from './modules/pessoa/pessoa.component';
import { RequisicaoComponent } from './modules/requisicao/requisicao.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'requisicao',
    component: RequisicaoComponent
  }, {
    path: 'exame',
    component: ExameComponent
  }, {
    path: 'exame-form',
    component: ExameFormComponent
  }, {
    path: 'pessoa',
    component: PessoaComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
