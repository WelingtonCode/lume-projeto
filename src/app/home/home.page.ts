import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // (opcional, mas útil)
import { RouterModule } from '@angular/router'; // IMPORTANTE para usar routerLink no HTML

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], // ADICIONADO RouterModule
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  irParaMenu() {
    this.router.navigate(['/menu']);
  }
}
