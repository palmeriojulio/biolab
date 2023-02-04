import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login-model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  formLogin!: FormGroup;

  durationInSeconds = 5;
  
  constructor(
    private service: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.createFormLogin(new Login());
  }

  createFormLogin(dados: Login) {
    this.formLogin = new FormGroup({
      login: new FormControl(dados.login),
      password: new FormControl(dados.password)
    })
  }

  public realizarLogin() {
    //CRIAR VALIDAÇÕES
    this.service.realizarLogin(this.formLogin.value.login, this.formLogin.value.password).subscribe((data: any) => {
      if(data) {
        this.redirecionarPrincipal();
        this.open('Login realizado com sucesso!','X')
      }
    }, (error) => {
      switch (error.status) {
        case 401:
        this.open('Login não autorizado, usuário ou senha inválidas','X');
        break;
      }
    });
  }

  public redirecionarPrincipal() {
    this.router.navigate(['/principal']);
  }

  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
