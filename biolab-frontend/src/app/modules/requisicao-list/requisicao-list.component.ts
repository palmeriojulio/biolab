import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Requisicao } from 'src/app/models/requisicao-model';

@Component({
  selector: 'app-requisicao-list',
  templateUrl: './requisicao-list.component.html',
  styleUrls: ['./requisicao-list.component.scss']
})
export class RequisicaoListComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Requisicao>;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'editar']

  constructor() { }

  ngOnInit(): void {
  }

}
