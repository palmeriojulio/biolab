import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  editar(id: number) {
    this.exameService.listarById(id).subscribe((res: any) => {
      this.exame = res;
      this.openDialog();
    });
  }

  deletar(id: number) {
    this.exameService.deletarExame(id).subscribe((res: any) => {
    }, (error) => {
      this.open(error.error.text, 'X');
      this.listarExames();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ExameFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'salvando') {
        this.listarExames();
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
