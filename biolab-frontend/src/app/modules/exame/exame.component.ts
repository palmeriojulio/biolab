import { ExameFormComponent } from './../exame-form/exame-form.component';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exame } from 'src/app/models/exame-model';
import { ExameService } from 'src/app/services/exame.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Primera página`;
  itemsPerPageLabel = $localize`Itens por página:`;
  lastPageLabel = $localize`Última página`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Próxima';
  previousPageLabel = 'Anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Página ${page + 1} de ${amountPages}`;
  }
}

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
    const dialogRef = this.dialog.open(ExameFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado da caixa de diálogo: ${result} `);
    });
  }

}
