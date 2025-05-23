import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  irParaMenu() {
    this.router.navigate(['/menu']);
  }


 irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}

