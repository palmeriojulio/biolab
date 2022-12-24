import { API } from './../../../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requisicao } from '../models/requisicao-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  localUrl: string;

  constructor(private http: HttpClient) {
    this.localUrl = `${API}biolab/`;
  }

  salvarRequisicao(requisao: Requisicao): Observable<Requisicao> {
    return this.http.post<Requisicao>(`${this.localUrl}requisicao`, requisao);
  }

  listarTodasRequisicoes(): Observable<Requisicao[]> {
    return this.http.get<Requisicao[]>(`${this.localUrl}requisicao/listar`);
  }

  listarPorId(id: number): Observable<Requisicao[]> {
    return this.http.get<Requisicao[]>(`${this.localUrl}requisicao/${id}`);
  }

  calcularTotalExame(total: number, valorExame: number, fator: string) {
    let params = { total: total, valorExame: valorExame, fator: fator };
    return this.http.get(`${this.localUrl}requisicao`, { params });
  }

}
