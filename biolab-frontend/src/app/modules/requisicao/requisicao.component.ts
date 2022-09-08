import { RequisicaoService } from './../../services/requisicao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {
  valor?: number;

  constructor(
    private requisicaoService: RequisicaoService,
  ) { }

  ngOnInit(): void {
    this._calcularTotalExame();
  }

  _calcularTotalExame() {
    this.requisicaoService.calcularTotalExame(40, 30, "SUBTRACAO").subscribe((res: any) => {
      this.valor = res;
    });
  }

}
