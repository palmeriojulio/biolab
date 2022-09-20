import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'valor', 'editar']
  dataSource!: MatTableDataSource<Exame>;

  constructor(
    private exameService: ExameService,
    private dialog: MatDialog
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

  openDialog() {
    this.dialog.open(ExameFormComponent, {
      width: '400px',
    });
  }

}
