import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Pessoa } from './../models/pessoa-model';
import { API } from './../../../app.api';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  localUrl: string;

  constructor(private http: HttpClient) {
    this.localUrl = `${API}biolab/`;
  }

  listarTodasPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.localUrl}pessoa`);
  }

}
