import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'editar', 'excluir', 'requisicao']
  pessoa!: Pessoa;
  durationInSeconds = 5;

  constructor(
    private pessoaService: PessoaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router, 
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

  editar(pessoa: any) {
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      width: '800px',
      data: pessoa
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPessoas();
    });
  }

  deletar(id: number) {    
    if (confirm("Deseja realmete excluir o cliente!")) {
      this.pessoaService.deletarPessoa(id).subscribe((res: any) => {
      }, (error) => {
        alert(error.error.text)
        this.listarPessoas();
      });
    }
  }

  requisicao(pessoa: any) {
    this.router.navigate(['/principal/requisicao'], pessoa);
  }

  openDialog(pessoa: Pessoa) {
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result === 'salvando') {
        this.listarPessoas();
      // }
    });
  }

  // Retornar mensagem depois de salvar
  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
