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
  title: string = "Adicionar exame"

  constructor(
    private exameService: ExameService,
    public dialogRef: MatDialogRef<ExameFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public exameEdit: Exame
  ) { }

  ngOnInit(): void {
    this.createForm(new Exame());
  }

  createForm(exame: Exame) {

    this.formExame = new FormGroup({
      id: new FormControl(exame.id, Validators.required),
      nome: new FormControl(exame.nome, Validators.required),
      tipo: new FormControl(exame.tipo, Validators.required),
      valor: new FormControl(exame.valor, Validators.required)
    });

    if (this.exameEdit) {
      this.btn = "Editar",
        this.title = "Editar exame",
        this.formExame.controls['id'].setValue(this.exameEdit.id),
        this.formExame.controls['nome'].setValue(this.exameEdit.nome),
        this.formExame.controls['tipo'].setValue(this.exameEdit.tipo),
        this.formExame.controls['valor'].setValue(this.exameEdit.valor)

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
      })
      this.formExame.reset(new Exame());

    } else {
      this.exameService.editarExame(this.formExame.value).subscribe((res: any) => {
        if (res != null) {
          this.open('Exame alterado com sucesso!', 'X');
        } else {
          this.open('Erro ao alterar o exame!', 'X');
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


