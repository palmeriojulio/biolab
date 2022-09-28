import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/pessoa-model';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  formPessoa!: FormGroup;
  paginator!: MatPaginator;
  durationInSeconds = 5;
  dataSource!: MatTableDataSource<Pessoa>;
  salvar: boolean = true;

  constructor(
    private pessoaService: PessoaService,
    public dialogRef: MatDialogRef<PessoaFormComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm(new Pessoa());
  }

  listarPessoas() {
    this.pessoaService.listarTodasPessoas().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  createForm(pessoa: Pessoa) {
    this.formPessoa = new FormGroup({
      nome: new FormControl(pessoa.nome, Validators.required),
      cpf: new FormControl(pessoa.cpf, Validators.required),
      rg: new FormControl(pessoa.rg, Validators.required),
      telefone: new FormControl(pessoa.telefone, Validators.required),
      diabetico: new FormControl(pessoa.diabetico, Validators.required),
      dataNascimento: new FormControl(pessoa.dataNascimento, Validators.required),
      outrasInformacoes: new FormControl(pessoa.outrasInformacoes, Validators.required),
      medicamentosQueToma: new FormControl(pessoa.medicamentosQueToma, Validators.required)
    })
  }

  onSubmit() {
    this.pessoaService.salvarPessoa(this.formPessoa.value).subscribe((res: any) => {
      if (res != null) {
        this.open('Pessoa salva com sucesso!', 'X');
      } else {

      }
      this.fecharModal('salvando');
    });
    this.formPessoa.reset(new Pessoa());
  }

  public fecharModal(msg: any) {
    this.dialogRef.close(msg)
  }

  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
