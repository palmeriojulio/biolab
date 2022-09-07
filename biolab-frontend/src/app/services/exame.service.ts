import { Exame } from './../models/exame-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from './../../../app.api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExameService {

  localUrl: string;

  constructor(private http: HttpClient) {
    this.localUrl = `${API}biolab/`;
   }

   listarTodosExames(): Observable<Exame[]> {
    return this.http.get<Exame[]>(`${this.localUrl}exame`);
   }

   salvarExame(exame: Exame) {
    return this.http.post(`${this.localUrl}exame`, JSON.stringify(exame));
   }

   atualizarExame(exame: Exame) {
    return this.http.put(`${this.localUrl}exame`, JSON.stringify(exame));
   }

   deletarExame(id: number) {
    return this.http.delete(`${this.localUrl}exame/${id}`);
   }
}