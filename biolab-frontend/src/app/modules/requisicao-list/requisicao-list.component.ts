import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Requisicao } from 'src/app/models/requisicao-model';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import jsPDF from 'jspdf';
import { Exame } from 'src/app/models/exame-model';

@Component({
  selector: 'app-requisicao-list',
  templateUrl: './requisicao-list.component.html',
  styleUrls: ['./requisicao-list.component.scss']
})
export class RequisicaoListComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Requisicao>;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'valor', 'data', 'visualizar'];
  requisicao!: Requisicao;
  exames: Exame[] = [];

  constructor(
    private requisicaoServer: RequisicaoService,
    private dialog: MatDialog,
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

  gerarPdf(idRequisicao: number) {
    this.requisicaoServer.listarPorId(idRequisicao).subscribe((res: any) => {

      this.requisicao = res;
      
      let doc = new jsPDF();

      doc.setProperties({ title: 'Requisição - '+this.requisicao.pessoa?.nome });

      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Via - Biolab", 8, 19);
      doc.text("Requisição: " + this.requisicao.id, + 8, 24);

      doc.addImage("assets/biolab_logo.png", "PNG", 83, 6, 120, 18.5);

      doc.setFillColor(0, 0, 0);
      doc.rect(8, 31, 110, 5);
      doc.rect(8, 36, 110, 5);
      doc.rect(8, 41, 110, 5);
      doc.rect(8, 46, 110, 5);
      doc.rect(8, 51, 110, 5);

      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Nome: " + this.requisicao.pessoa?.nome, + 10, 35);
      doc.text("CPF: " + this.requisicao.pessoa?.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"), + 10, 40);
      doc.text("Data de Nascimento: " + this.requisicao.pessoa?.dataNascimento?.split('-').reverse().join('/'), + 10, 45);
      doc.text("Medicamentos que toma: " + this.requisicao.pessoa?.medicamentosQueToma, + 10, 50);
      doc.text("Médico Solicitante: " + this.requisicao.nomeMedico, + 10, 55);

      doc.setFillColor(0, 0, 0);
      doc.rect(118, 31, 85, 5);
      doc.rect(118, 36, 85, 5);
      doc.rect(118, 41, 85, 5);
      doc.rect(118, 46, 85, 5);
      doc.rect(118, 51, 85, 5);

      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Tel: " + this.requisicao.pessoa?.telefone?.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, '($1) $2 $3-$4'), + 120, 35);
      doc.text("RG: " + this.requisicao.pessoa?.rg, + 120, 40);
      doc.text("Diabético: " + this.requisicao.pessoa?.diabetico, + 120, 45);
      doc.text("Outras Informações: " + this.requisicao.pessoa?.outrasInformacoes, + 120, 50);
      doc.text("CRM do Médico: " + this.requisicao.crmMedico, + 120, 55);

      doc.setFont("times");
      doc.text("Exames solicitados:", 8, 63);

      let x = 8;
      let y = 70;

      for (let i = 0; i < res.exames.length; i++) {

        if (y == 142) {
          x = x + 50;
          y = 70
        }

        doc.text(res.exames[i].nome, + x, y);
        doc.text("\n" + res.exames[i].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), + x, y);
        y = y + 12;

      }

      doc.text("Data: " + res.dataCriacaoRequisicao.split('-').reverse().join('/'), + 8, 144);
      doc.text("Valor: " + this.requisicao.valorTotalRequisicao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), + 39, 144);
      doc.text("Pagamento: " + this.requisicao.formaPagamento?.split('_').join(' '), + 70, 144);

      //doc.addImage("assets/rodape.png", "PNG", -1,123,201,30,"rodape");

      doc.line(8, 148, 202, 148); // horizontal line

      doc.text("Via - Cliente", 8, 169);
      doc.text("ID da requisição: " + this.requisicao.id, + 8, 174);

      doc.addImage("assets/biolab_logo.png", "PNG", 83, 155, 120, 18.5);

      doc.setFillColor(0, 0, 0);
      doc.rect(8, 180, 110, 5);
      doc.rect(8, 185, 110, 5);
      doc.rect(8, 190, 110, 5)
      doc.rect(8, 195, 110, 5);
      doc.rect(8, 200, 110, 5);

      doc.setFont("times")
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Nome: " + this.requisicao.pessoa?.nome, + 10, 184);
      doc.text("CPF: " + this.requisicao.pessoa?.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"), + 10, 189);
      doc.text("Data de Nascimento: " + this.requisicao.pessoa?.dataNascimento?.split('-').reverse().join('/'), + 10, 194);
      doc.text("Medicamentos que toma: " + this.requisicao.pessoa?.medicamentosQueToma, + 10, 199);
      doc.text("Médico Solicitante: " + this.requisicao.nomeMedico, + 10, 204);

      doc.setFillColor(0, 0, 0);
      doc.rect(118, 180, 85, 5);
      doc.rect(118, 185, 85, 5);
      doc.rect(118, 190, 85, 5);
      doc.rect(118, 195, 85, 5);
      doc.rect(118, 200, 85, 5);

      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Tel: " + this.requisicao.pessoa?.telefone?.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, '($1) $2 $3-$4'), + 120, 184);
      doc.text("RG: " + this.requisicao.pessoa?.rg, + 120, 189);
      doc.text("Diabético: " + this.requisicao.pessoa?.diabetico, + 120, 194);
      doc.text("Outras Informações: " + this.requisicao.pessoa?.outrasInformacoes, + 120, 199);
      doc.text("CRM do Médico: " + this.requisicao.crmMedico, + 120, 204);

      doc.setFont("times");
      doc.text("Exames solicitados:", 8, 212);

      let x2 = 8;
      let y2 = 220;

      for (let i = 0; i < res.exames.length; i++) {

        if (y2 == 292) {
          x2 = x2 + 50;
          y2 = 220;
        }

        doc.text(res.exames[i].nome, + x2, y2);
        doc.text("\nR$ " + res.exames[i].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), + x2, y2);
        y2 = y2 + 12;

      }

      doc.text("Data: " + res.dataCriacaoRequisicao.split('-').reverse().join('/'), + 8, 294);
      doc.text("Valor: " + this.requisicao.valorTotalRequisicao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), + 39, 294);
      doc.text("Pagamento: " + this.requisicao.formaPagamento?.split('_').join(' '), + 70, 294);

      //doc.addImage("assets/rodape.png", "PNG", -1,271,201,25,"rodape");

      doc.output("dataurlnewwindow");
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
