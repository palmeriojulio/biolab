import { ExameService } from './../../services/exame.service';
import { Exame } from './../../models/exame-model';
import { RequisicaoService } from './../../services/requisicao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {
  valor?: number;
  exames?: Exame[];

  constructor(
    private requisicaoService: RequisicaoService,
    private exameService: ExameService
  ) { }

  ngOnInit(): void {
    this._calcularTotalExame();
    this._exames();
  }

  _calcularTotalExame() {
    this.requisicaoService.calcularTotalExame(40, 30, "SUBTRACAO").subscribe((res: any) => {
      this.valor = res;
    });
  }

  _exames() {
    this.exameService.listarTodosExames().subscribe((res:any) => {
      this.exames = res;
    });
  }

}
