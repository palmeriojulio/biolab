import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Exame } from 'src/app/models/exame-model';
import { ExameService } from 'src/app/services/exame.service';

import { ExameFormComponent } from './../exame-form/exame-form.component';

@Component({
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.scss']
})

export class ExameComponent implements OnInit {

  //Variáveis da lista
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'valor', 'editar']
  dataSource!: MatTableDataSource<Exame>;
  exame!: Exame;
  durationInSeconds = 5;

  constructor(
    private exameService: ExameService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarExames();
  }

  listarExames() {
    this.exameService.listarTodosExames().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  editar(exame: any) {
    const dialogRef = this.dialog.open(ExameFormComponent, {
      width: '400px',
      data: exame
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
    });
  }

  deletar(id: number) {

    if (confirm("Deseja realmete excluir o exame!")) {
      this.exameService.deletarExame(id).subscribe((res: any) => {
      }, (error) => {
        alert(error.error.text)
        this.listarExames();
      });
    }
  }

  openDialog(exame: Exame) {
    const dialogRef = this.dialog.open(ExameFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarExames();
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
