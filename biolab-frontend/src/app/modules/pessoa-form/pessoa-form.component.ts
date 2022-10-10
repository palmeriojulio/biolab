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
  btn: string = "Salvar"
  title: string = "Adicionar cliente"

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private pessoaService: PessoaService,
    public dialogRef: MatDialogRef<PessoaFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public pessoaEdit: any
  ) { }

  ngOnInit(): void {
    this.createForm(new Pessoa());
  }

  createForm(pessoa: Pessoa) {
    this.formPessoa = new FormGroup({
      id: new FormControl(pessoa.id, Validators.required),
      nome: new FormControl(pessoa.nome, Validators.required),
      cpf: new FormControl(pessoa.cpf, Validators.required),
      rg: new FormControl(pessoa.rg),
      telefone: new FormControl(pessoa.telefone),
      diabetico: new FormControl(pessoa.diabetico),
      dataNascimento: new FormControl(pessoa.dataNascimento),
      outrasInformacoes: new FormControl(pessoa.outrasInformacoes),
      medicamentosQueToma: new FormControl(pessoa.medicamentosQueToma)
    });

    if (this.pessoaEdit) {
      this.btn = "Editar"
      this.title = "Editar cliente"
      this.formPessoa.controls['id'].setValue(this.pessoaEdit.id),
        this.formPessoa.controls['nome'].setValue(this.pessoaEdit.nome),
        this.formPessoa.controls['cpf'].setValue(this.pessoaEdit.cpf),
        this.formPessoa.controls['rg'].setValue(this.pessoaEdit.rg),
        this.formPessoa.controls['telefone'].setValue(this.pessoaEdit.telefone),
        this.formPessoa.controls['diabetico'].setValue(this.pessoaEdit.diabetico),
        this.formPessoa.controls['dataNascimento'].setValue(this.pessoaEdit.dataNascimento),
        this.formPessoa.controls['outrasInformacoes'].setValue(this.pessoaEdit.outrasInformacoes),
        this.formPessoa.controls['medicamentosQueToma'].setValue(this.pessoaEdit.medicamentosQueToma)
    }
  }

  onSubmit() {
    console.log(this.formPessoa.value)
    if (this.btn != "Editar") {
      this.pessoaService.salvarPessoa(this.formPessoa.value).subscribe((res: any) => {
        if (res != null) {
          this.open('Cliente salva com sucesso!', 'X');
        } else {
          this.open('Erro ao salvar o cliente!', 'X');
        }
        this.fecharModal();
      });
      this.formPessoa.reset(new Pessoa());

    } else {
      this.pessoaService.deletarPessoa(this.formPessoa.value).subscribe((res: any) => {
        if (res != null) {
          this.open('Pessoa salva com sucesso!', 'X');
        } else {
          this.open('Erro ao salva a pessoa!', 'X');
        }
        this.fecharModal();
      })
    }

  }

  public fecharModal() {
    this.dialogRef.close();
  }

  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
