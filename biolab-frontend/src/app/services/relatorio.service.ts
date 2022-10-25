import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API } from 'app.api';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  localUrl: string;
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.localUrl = `${API}biolab/`;
  }

  relatorioRequisicao(idRequisicao: any) {
    let parametros = new HttpParams();
   
    if(idRequisicao !== undefined && idRequisicao !== null){
      parametros = parametros.append('idRequisicao', idRequisicao);
    }

    const httpOptionsBlob = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: parametros
    };

    return this.http.get(`${this.localUrl}relatorio/requisicao`, httpOptionsBlob);
  }
}
