import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Requisicao } from 'src/app/models/requisicao-model';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { RequisicaoPdfComponent } from '../requisicao-pdf/requisicao-pdf.component';
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
  exames: Exame[] | undefined;
  
  constructor(
    private requisicaoServer: RequisicaoService,
    private dialog: MatDialog,
    private relatorioService: RelatorioService
  ) {}

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

  gerarPdf(idRequisicao: any) {
    this.requisicaoServer.listarPorId(idRequisicao).subscribe((res: any) => {
      
      this.requisicao = res;

      let e = this.obterExames(this.requisicao.exames);
          
      let doc = new jsPDF();

      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);
      doc.text("Via - Biolab", 8, 24);
      doc.text("ID da requisição: "+this.requisicao.id,+ 8, 29);
      
      doc.addImage("assets/biolab_logo.png", "PNG", 83,11.5,120,18.5);
      
      doc.setFillColor(0,0,0);
      doc.rect(8,36,110,5);
      doc.rect(8,41,110,5);
      doc.rect(8,46,110,5);
      doc.rect(8,51,110,5);
      doc.rect(8,56,110,5);
      
      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);
      doc.text("Nome: "+this.requisicao.pessoa?.nome,+ 10, 40);
      doc.text("CPF: "+this.requisicao.pessoa?.cpf,+ 10, 45);
      doc.text("Data de Nascimento: "+this.requisicao.pessoa?.dataNascimento,+ 10, 50);
      doc.text("Medicamentos que toma: "+this.requisicao.pessoa?.medicamentosQueToma,+ 10, 55);
      doc.text("Médico Solicitante: "+this.requisicao.nomeMedico,+ 10, 60);
      
      doc.setFillColor(0,0,0);
      doc.rect(118,36,85,5);
      doc.rect(118,41,85,5);
      doc.rect(118,46,85,5);
      doc.rect(118,51,85,5);
      doc.rect(118,56,85,5);
      
      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);
      doc.text("Tel: "+this.requisicao.pessoa?.telefone,+ 120, 40);
      doc.text("RG: "+this.requisicao.pessoa?.rg,+ 120, 45);
      doc.text("Diabético: "+this.requisicao.pessoa?.diabetico,+ 120, 50);
      doc.text("Outras Informações: "+this.requisicao.pessoa?.outrasInformacoes,+ 120, 55);
      doc.text("CRM do Médico: "+this.requisicao.crmMedico,+ 120, 60);

      doc.setFont("times");
      doc.text("Exames solicitados",8,70);

      for (let i = 0; i < e.length; i++) {
        const element = e[i];
        console.log(element[i])
        //doc.text("Exame: "+element[i].nome,+ 8, 75);
      }       
            
      
      //doc.addImage("assets/rodape.png", "PNG", -1,123,201,30,"rodape");

      doc.line(10, 148, 200, 148); // horizontal line
      
      doc.addImage("assets/biolab_logo.png", "PNG", 83,160.5,120,18.5);

      doc.setFillColor(0,0,0);
      doc.rect(8,185,110,5);
      doc.rect(8,190,110,5);
      doc.rect(8,195,110,5)
      doc.rect(8,200,110,5);
      doc.rect(8,205,110,5);
      
      doc.setFont("times")
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);
      doc.text("Nome: "+this.requisicao.pessoa?.nome,+ 10, 189);
      doc.text("CPF: "+this.requisicao.pessoa?.cpf,+ 10, 194);
      doc.text("Data de Nascimento: "+this.requisicao.pessoa?.dataNascimento,+ 10, 199);
      doc.text("Medicamentos que toma: "+this.requisicao.pessoa?.medicamentosQueToma,+ 10, 204);
      doc.text("Médico Solicitante: "+this.requisicao.nomeMedico,+ 10, 209);

      doc.setFillColor(0,0,0);
      doc.rect(118,185,85,5);
      doc.rect(118,190,85,5);
      doc.rect(118,195,85,5);
      doc.rect(118,200,85,5);
      doc.rect(118,205,85,5);

      doc.setFont("times");
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);
      doc.text("Tel: "+this.requisicao.pessoa?.telefone,+ 120, 189);
      doc.text("RG: "+this.requisicao.pessoa?.rg,+ 120, 194);
      doc.text("Diabético: "+this.requisicao.pessoa?.diabetico,+ 120, 199);
      doc.text("Outras Informações: "+this.requisicao.pessoa?.outrasInformacoes,+ 120, 204);
      doc.text("CRM do Médico: "+this.requisicao.crmMedico,+ 120, 209);

      doc.text("Via - Cliente", 8, 174);
      doc.text("ID da requisição: "+this.requisicao.id,+ 8, 179);
      
      //doc.addImage("assets/rodape.png", "PNG", -1,271,201,25,"rodape");

      doc.output("dataurlnewwindow");
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obterExames(e: any) {
    const ex = e;
    for (let i = 0; i < ex.length; i++) {
      console.log(ex[i])
    } 
    return ex;
  }

}
