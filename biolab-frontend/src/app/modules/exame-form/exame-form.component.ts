import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  salvar: boolean = true;

  constructor(
    private exameService: ExameService,
    public dialogRef: MatDialogRef<ExameFormComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm(new Exame());
  }

  createForm(exame: Exame) {
    this.formExame = new FormGroup({
      nome: new FormControl(exame.nome, Validators.required),
      tipo: new FormControl(exame.tipo, Validators.required),
      valor: new FormControl(exame.valor, Validators.required)
    })
  }

  onSubmit() {
    this.exameService.salvarExame(this.formExame.value).subscribe((res: any) => {
      if (res != null) {
        this.open('Exame salvo com sucesso!', 'X');
      } else {

      }
      this.fecharModal('salvando');
    });
    this.formExame.reset(new Exame());
  }

  public fecharModal(msg: any) {
    this.dialogRef.close(msg);
  }

  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
