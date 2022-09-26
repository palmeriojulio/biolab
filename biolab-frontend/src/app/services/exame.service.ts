import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

import { API } from './../../../app.api';
import { Exame } from './../models/exame-model';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  [x: string]: any;

  localUrl: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.localUrl = `${API}biolab/`;
  }

  salvarExame(exame: Exame) {
    return this.http.post(`${this.localUrl}exame`, exame);
  }

  listarTodosExames(): Observable<Exame[]> {
    return this.http.get<Exame[]>(`${this.localUrl}exame`);
  }

  listarById(id: number) {
    return this.http.get(`${this.localUrl}exame/${id}`)
  }

  editarExame(exame: Exame) {
    return this.http.put(`${this.localUrl}exame`, exame);
  }

  deletarExame(id: number) {
    return this.http.delete(`${this.localUrl}exame/${id}`);
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
