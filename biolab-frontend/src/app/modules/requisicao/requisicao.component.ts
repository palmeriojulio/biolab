import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/pessoa-model';
import { Requisicao } from 'src/app/models/requisicao-model';
import { PessoaService } from 'src/app/services/pessoa.service';

import { RequisicaoService } from './../../services/requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.scss']
})
export class RequisicaoComponent implements OnInit {

  valor?: number;
  formRequisicao!: FormGroup;
  dataSource!: MatTableDataSource<Pessoa>;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'editar']
  visibleForm: boolean = false;
  pessoa!: Pessoa;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private requisicaoService: RequisicaoService,
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._calcularTotalExame();
    this.createForm(new Requisicao());
  }

  _calcularTotalExame() {
    this.requisicaoService.calcularTotalExame(40, 30, "SUBTRACAO").subscribe((res: any) => {
      this.valor = res;
    });
  }

  listarExames() {
    throw new Error('Method not implemented.');
  }

  createForm(req: Requisicao) {
    this.formRequisicao = new FormGroup({
      nome: new FormControl(req.pessoa?.nome),
      cpf: new FormControl(req.pessoa?.cpf)
    })
  }

  onSubmit() {
    if (this.formRequisicao.value.cpf) {
      console.log("O cpf " + this.formRequisicao.value.cpf + " existe")
      this.pessoaService.pesquisarClientePorCPF(this.formRequisicao.value.cpf).subscribe((res: any) => {
        this.pessoa = res;
        this.visibleForm = true;
      })
    } else {
      console.log("O cpf " + this.formRequisicao.value.cpf + " não xxxxxxxxxxxxxexiste")
    }
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
