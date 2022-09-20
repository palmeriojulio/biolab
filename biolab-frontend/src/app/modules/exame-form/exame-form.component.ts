import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Exame } from 'src/app/models/exame-model';
import { ExameService } from 'src/app/services/exame.service';


@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrls: ['./exame-form.component.scss']
})
export class ExameFormComponent implements OnInit {

  formExame!: FormGroup;

  constructor(
    private exameService: ExameService,
  ) { }

  ngOnInit(): void {
    this.createForm(new Exame());
  }

  createForm(exame: Exame) {
    this.formExame = new FormGroup({
      nome: new FormControl(exame.nome),
      tipo: new FormControl(exame.tipo),
      valor: new FormControl(exame.valor)
    })
  }

  onSubmit() {
    this.exameService.salvarExame(this.formExame.value);
    this.formExame.reset(new Exame());
  }
}
