import { Component, OnInit } from '@angular/core';
import { Exame } from 'src/app/models/exame-model';
import { ExameService } from 'src/app/services/exame.service';

@Component({
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.css']
})
export class ExameComponent implements OnInit {

  exames: Exame[] = [];
  displayedColumns = ['nome','categori']

  constructor(
    private exameService: ExameService
    ) { }

  ngOnInit(): void {
    this._exames();
  }

  _exames() {
    this.exameService.listarTodosExames().subscribe((res:any) => {
      this.exames = res;
    });
  }

}
