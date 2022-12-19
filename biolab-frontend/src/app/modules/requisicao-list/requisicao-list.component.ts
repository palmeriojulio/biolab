import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Requisicao } from 'src/app/models/requisicao-model';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';

@Component({
  selector: 'app-requisicao-list',
  templateUrl: './requisicao-list.component.html',
  styleUrls: ['./requisicao-list.component.scss']
})
export class RequisicaoListComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Requisicao>;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'valor', 'data', 'visualizar']
  requisicao!: Requisicao;

  constructor(
    private requisicaoServer: RequisicaoService,
    private relatorioService: RelatorioService
  ) { }

  ngOnInit(): void {
    this.listarRequisicao();
  }

  listarRequisicao() {
    this.requisicaoServer.listarTodasRequisicoes().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })    
  }

  goRelatorioRequisicao(idRequisicao: any) {
    this.relatorioService.relatorioRequisicao(idRequisicao).subscribe((data: any) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(file);
      window.open(url);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
