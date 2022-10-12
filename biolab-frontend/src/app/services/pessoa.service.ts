import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { API } from './../../../app.api';
import { Pessoa } from './../models/pessoa-model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  [x: string]: any;

  localUrl: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.localUrl = `${API}biolab/`;
  }

  listarTodasPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.localUrl}pessoa`);
  }

  pesquisarClientePorNome(nome: String) {
    return this.http.get(`${this.localUrl}pessoa/nome/${nome}`);
  }

  pesquisarClientePorCPF(cpf: String) {
    return this.http.get(`${this.localUrl}pessoa/cpf/${cpf}`);
    console.log(cpf)
  }

  salvarPessoa(pessoa: Pessoa) {
    return this.http.post(`${this.localUrl}pessoa`, pessoa);
  }

  editarPessoa(pessoa: Pessoa) {
    return this.http.put(`${this.localUrl}pessoa`, pessoa);
  }

  deletarPessoa(id: number) {
    return this.http.delete(`${this.localUrl}passoa/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T): () => Observable<T> {
    return (): Observable<T> => {
      const toastMessage = 'Erro ao ' + operation + '.';
      this.snackBar.open(toastMessage, 'X');

      if (!result) {
        return throwError(new Error());
      }
      return of(result as T);
    };
  }

}
