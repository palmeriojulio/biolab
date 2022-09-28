import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/pessoa-model';
import { PessoaService } from 'src/app/services/pessoa.service';

import { PessoaFormComponent } from './../pessoa-form/pessoa-form.component';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})

export class PessoaComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Pessoa>;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'editar']

  durationInSeconds = 5;

  constructor(
    private pessoaService: PessoaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoaService.listarTodasPessoas().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  deletar(id: number) {
    this.pessoaService.deletarPessoa(id).subscribe((res: any) => {
    }, (error) => {
      this.open(error.error.text, 'X');
      this.listarPessoas();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PessoaFormComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'salvando') {
        this.listarPessoas();
      }
    });
  }

  // Retornar mensagem depois de salvar
  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
