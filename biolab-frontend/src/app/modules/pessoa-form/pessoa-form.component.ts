import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/pessoa-model';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Pessoa>;

  constructor(
    private pessoaService: PessoaService,
  ) { }

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoaService.listarTodasPessoas().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

}
