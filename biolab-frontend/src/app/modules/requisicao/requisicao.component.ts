﻿import { Exame } from './../../models/exame-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Pessoa } from 'src/app/models/pessoa-model';
import { Requisicao } from 'src/app/models/requisicao-model';
import { ExameService } from 'src/app/services/exame.service';
import { PessoaService } from 'src/app/services/pessoa.service';

import { RequisicaoService } from './../../services/requisicao.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  valor: number = 0;
  formPesq!: FormGroup;
  formRequisicao!: FormGroup;
  visibleForm: boolean = false;
  pessoa!: Pessoa;
  requisicao!: Requisicao;
  exames?: Exame[];
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fator: string = '';
  examesSelecionados?: Exame[] = [];

  constructor(
    private requisicaoService: RequisicaoService,
    private pessoaService: PessoaService,
    private exameService: ExameService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._initRequisicao();
  }

  _initRequisicao() {
    this.createFormPesq(new Requisicao());
    this.createFormRequisicao(new Requisicao());
    this.valor = 0;
    this.listarExames();
  }

  _calcularTotalExame(total: number, valor: number, fator: string) {
    this.requisicaoService.calcularTotalExame(total, valor, fator).subscribe((res: any) => {
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
      pessoa: new FormControl(req.pessoa),
      exames: new FormControl(req.exames)

    })

    this.fator = '';
  }

  pesquisar() {
    if (this.formPesq.value.cpf) {
      this.pessoaService.pesquisarClientePorCPF(this.formPesq.value.cpf).subscribe((res: any) => {
        if (res == null) {
          this.open("Cliente não está cadatrado!", "X");
        } else {
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
    this.formRequisicao.value.pessoa = this.pessoa;
    this.formRequisicao.value.exames = this.examesSelecionados;

    this.requisicaoService.salvarRequisicao(this.formRequisicao.value).subscribe((res: any) => {
      if (res != null) {
        this.open("Requisição salva com sucesso", "X");
        this._initRequisicao();
        this.visibleForm = false;
      }
    });
  }

  // Retornar mensagem depois de salvar
  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  public eventoCheckBox(event: MatCheckboxChange) {
    if (event.checked) {
      this.fator = "SOMA"
    } else {
      this.fator = "SUBTRACAO"
    }
  }

  public obterExame(event: any) {
    this._calcularTotalExame(this.valor, event.valor, this.fator);
    this.getExamesSelecionados(event.id, this.fator);
    this.formRequisicao.value.exames = this.examesSelecionados;
    console.log(this.formRequisicao.value)

  }

  public getExamesSelecionados(id: number, fator: string) {
    switch (fator) {
      case 'SOMA':
        this.examesSelecionados?.push(new Exame(id));
        break;
      case 'SUBTRACAO':
        this.examesSelecionados?.splice(this.examesSelecionados?.indexOf(new Exame(id)));
        break;
      default:
        break;
    }
  }


}
