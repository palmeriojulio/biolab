import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API } from 'app.api';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;

  localUrl: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.localUrl = `${API}biolab/`;
  }

  realizarLogin(login: string, password: string): Observable<any> {
    let params = { login: login, password: password };
    return this.http.get<any>(`${this.localUrl}validarSenha`, { params });
  }
}
