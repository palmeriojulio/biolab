﻿import { Exame } from './../../models/exame-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Pessoa } from 'src/app/models/pessoa-model';
import { Requisicao } from 'src/app/models/requisicao-model';
import { ExameService } from 'src/app/services/exame.service';
import { PessoaService } from 'src/app/services/pessoa.service';

import { RequisicaoService } from './../../services/requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  valor?: number;
  formPesq!: FormGroup;
  formRequisicao!: FormGroup;
  visibleForm: boolean = false;
  pessoa!: Pessoa;
  requisicao!: Requisicao;
  exames?: Exame[];
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private requisicaoService: RequisicaoService,
    private pessoaService: PessoaService,
    private exameService: ExameService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._calcularTotalExame();
    this.createFormPesq(new Requisicao());
    this.createFormRequisicao(new Requisicao());
    this.listarExames();
  }

  _calcularTotalExame() {
    this.requisicaoService.calcularTotalExame(40.50, 30.25, "SUBTRACAO").subscribe((res: any) => {
      this.valor = res;
    });
  }

  listarExames() {
    this.exameService.listarTodosExames().subscribe((res: any) => {
      this.exames = res;
    });
  }

  createFormPesq(req: Requisicao) {
    this.formPesq = new FormGroup({
      cpf: new FormControl(req.pessoa?.cpf)
    })
  }

  createFormRequisicao(req: Requisicao) {
    this.formRequisicao = new FormGroup({
      formaPagamento: new FormControl(req.formaPagamento),
      nomeMedico: new FormControl(req.nomeMedico),
      crmMedico: new FormControl(req.crmMedico),
      valorTotalRequisicao: new FormControl(req.valorTotalRequisicao),
      dataCriacaoRequisicao: new FormControl(req.dataCriacaoRequisicao),
      // exames: new FormControl(req.exames)
      // pessoa?: Pessoa;

    })
  }

  pesquisar() {
    if (this.formPesq.value.cpf) {
      this.pessoaService.pesquisarClientePorCPF(this.formPesq.value.cpf).subscribe((res: any) => {
        if (res == null) {
          this.open("Cliente não está cadatrado!", "X");
        } else {
          console.log(res)
          this.pessoa = res;
          this.visibleForm = true;
        }
      })
    } else {
      this.open("Campo CPF vazio!", "X")
    }
  }

  onSubmit() {
    this.formRequisicao.value.valorTotalRequisicao = this.valor;
    console.log(this.formRequisicao.value);
  }

  // Retornar mensagem depois de salvar
  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

}
