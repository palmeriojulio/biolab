import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-requisicao-pdf',
  templateUrl: './requisicao-pdf.component.html',
  styleUrls: ['./requisicao-pdf.component.css']
})
export class RequisicaoPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gerarPDF() {
    let documento = new jsPDF();
    documento.text("Relatório em PDF no Angular", 10, 10);
    documento.output("dataurlnewwindow");
  }

}
