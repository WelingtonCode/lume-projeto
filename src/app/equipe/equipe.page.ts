import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipe',
  standalone: true,
  templateUrl: './equipe.page.html',
  styleUrls: ['./equipe.page.scss'],
})
export class EquipePage {
  constructor(private router: Router) {}

  voltarMenu() {
    this.router.navigate(['/menu']);
  }
}
