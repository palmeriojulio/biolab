import { MatPaginator } from '@angular/material/paginator';
import { Pessoa } from 'src/app/models/pessoa-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Pessoa>;

  constructor(
    private pessoaService: PessoaService,
    private dialog: MatDialog
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
