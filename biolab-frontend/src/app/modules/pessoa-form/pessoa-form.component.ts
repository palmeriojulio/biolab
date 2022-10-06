import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  durationInSeconds = 5;
  dataSource!: MatTableDataSource<Pessoa>;
  salvar: boolean = true;
  btn: string = "Salvar"
  title: string = "Adicionar cliente"

  constructor(
    private pessoaService: PessoaService,
    public dialogRef: MatDialogRef<PessoaFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.createForm(new Pessoa());
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
    });

    if (this.editData) {
      this.btn = "Editar"
      this.title = "Editar cliente"
      this.formPessoa.controls['nome'].setValue(this.editData.nome),
        this.formPessoa.controls['cpf'].setValue(this.editData.cpf),
        this.formPessoa.controls['rg'].setValue(this.editData.rg),
        this.formPessoa.controls['telefone'].setValue(this.editData.telefone),
        this.formPessoa.controls['diabetico'].setValue(this.editData.diabetico),
        this.formPessoa.controls['dataNascimento'].setValue(this.editData.dataNascimento),
        this.formPessoa.controls['outrasInformacoes'].setValue(this.editData.outrasInformacoes),
        this.formPessoa.controls['medicamentosQueToma'].setValue(this.editData.medicamentosQueToma)
    }
  }

  onSubmit() {

    if (this.btn != "Editar") {

      this.pessoaService.salvarPessoa(this.formPessoa.value).subscribe((res: any) => {
        if (res != null) {
          this.open('Cliente salva com sucesso!', 'X');
        } else {
          this.open('Erro ao salvar o cliente!', 'X');
        }
        this.fecharModal('salvando');
      });
      this.formPessoa.reset(new Pessoa());

    } else {

    }

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
