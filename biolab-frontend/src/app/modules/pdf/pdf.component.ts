import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  nome: String = 'Palmerio';
  cpf: String = '05385485785'

  constructor() { }

  ngOnInit(): void {
  }

  gerarPDF() {
    const doc = new jsPDF();
    // doc.text("Hello world!" + this.nome, 10, 10);
    //doc.html();
    // doc.save("a4.pdf"); // will save the file in the current working directory


    //   doc.html(document., {
    //     callback: function (doc) {
    //       doc.save();
    //     }
    //   });
    // }

  }
}
