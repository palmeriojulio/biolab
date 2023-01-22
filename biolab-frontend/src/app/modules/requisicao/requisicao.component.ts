import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Pessoa } from 'src/app/models/pessoa-model';
import { Requisicao } from 'src/app/models/requisicao-model';
import { ExameService } from 'src/app/services/exame.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Router } from '@angular/router';

import { Exame } from './../../models/exame-model';
import { RequisicaoService } from './../../services/requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  valor: number = 0;
  conteExames: number = 0;
  btnSalvar = false;
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
  route!: Router;

  constructor(
    private requisicaoService: RequisicaoService,
    private pessoaService: PessoaService,
    private exameService: ExameService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._initRequisicao();
  }

  _initRequisicao() {
    this.createFormPesq(new Requisicao());
    this.createFormRequisicao(new Requisicao());
    this.valor = 0;
    this.listarExames();
    this.examesSelecionados = [];
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
      formaPagamento: new FormControl(req.formaPagamento, Validators.required),
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

    if (this.formRequisicao.value.formaPagamento == null) {
      this.open("Escolha a forma de pagamento", "X");      
    } else {
      this.formRequisicao.value.valorTotalRequisicao = this.valor;
      this.formRequisicao.value.pessoa = this.pessoa;
      this.formRequisicao.value.exames = this.examesSelecionados;
  
      this.requisicaoService.salvarRequisicao(this.formRequisicao.value).subscribe((res: any) => {
        if (res != null) {
          this.open("Requisição salva com sucesso", "X");
          this._initRequisicao();
          this.visibleForm = false;
        }
        this.router.navigate(['/requisicao-list']);
      });
    }
  }



  // Retornar mensagem depois de salvar
  open(message: string, action: string,) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  public eventoCheckBox(event: MatCheckboxChange) {    
    if (event.checked) {
      this.fator = "SOMA"
      this.conteExames = this.conteExames + 1;

      if (this.conteExames >= 24) {
        this.open("Quantidade de exames não pode passar de 24!", "X");
        this.btnSalvar = true
      }
      
    } else {
      this.fator = "SUBTRACAO"
      this.conteExames = this.conteExames - 1;

      if (this.conteExames <= 23) {
        this.btnSalvar = false
      }
    }
  }

  public obterExame(event: any) {
    this._calcularTotalExame(this.valor, event.valor, this.fator);
    this.getExamesSelecionados(event.id, this.fator);
    this.formRequisicao.value.exames = this.examesSelecionados;

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
