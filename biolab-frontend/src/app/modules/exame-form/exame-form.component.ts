import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exame } from 'src/app/models/exame-model';
import { ExameService } from 'src/app/services/exame.service';


@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrls: ['./exame-form.component.scss']
})
export class ExameFormComponent implements OnInit {

  formExame!: FormGroup;
  durationInSeconds = 5;
  btn: string = "Salvar"
  title: string = "Adicionar novo exame"

  constructor(
    private exameService: ExameService,
    public dialogRef: MatDialogRef<ExameFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.createForm(new Exame());
  }

  createForm(exame: Exame) {
    this.formExame = new FormGroup({
      nome: new FormControl(exame.nome, Validators.required),
      tipo: new FormControl(exame.tipo, Validators.required),
      valor: new FormControl(exame.valor, Validators.required)
    });
    if (this.editData) {
      this.btn = "Editar",
        this.title = "Editar exame",
        this.formExame.controls['nome'].setValue(this.editData.nome),
        this.formExame.controls['tipo'].setValue(this.editData.tipo),
        this.formExame.controls['valor'].setValue(this.editData.valor)
    }
  }

  onSubmit() {

    if (this.btn != "Editar") {
      this.exameService.salvarExame(this.formExame.value).subscribe((res: any) => {
        if (res != null) {
          this.open('Exame salvo com sucesso!', 'X');
        } else {
          this.open('Erro ao salvar o exame!', 'X');
        }
        this.fecharModal();
      });
      this.formExame.reset(new Exame());
    } else {
      this.editData.valor = this.formExame.value.valor;
      this.exameService.editarExame(this.editData).subscribe((res: any) => {
        if (res != null) {
          this.listarExames();
          this.fecharModal();
          this.open('Exame alterado com sucesso!', 'X');
        } else {
          this.open('Erro ao alterar o exame!', 'X');
        }
      });
    }

  }

  listarExames() {
    this.exameService.listarTodosExames();
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


