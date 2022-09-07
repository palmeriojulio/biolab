import { RequisicaoComponent } from './modules/requisicao/requisicao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children:  [{
    path: '',
    component: RequisicaoComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
