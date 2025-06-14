import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  constructor(private router: Router) {}

  cadastrar() {
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }
}
