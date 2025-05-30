import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router) {}

  irParaHome() {
    this.router.navigate(['/home']);
  }


 irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}

