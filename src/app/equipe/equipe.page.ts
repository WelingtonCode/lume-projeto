import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [IonicModule], // importa IonicModule para usar ion-* componentes
  templateUrl: './equipe.page.html',
  styleUrls: ['./equipe.page.scss'],
})
export class EquipePage {
  modalAberto = false;
  devSelecionado: { nome: string; bio: string; foto: string } | null = null;

  equipe = [
    {
      nome: 'Antonio Luis',
      bio: 'Desenvolvedor Fullstack, apaixonado por Angular e Ionic.',
      foto: 'assets/tonhao.jpg',
    },
    {
      nome: 'Welington Carvalho',
      bio: 'Especialista em backend e APIs REST.',
      foto: 'assets/wel.jpg',
    },
    {
      nome: 'Kauã Alves',
      bio: 'Designer UX/UI e frontend developer.',
      foto: 'assets/kauaintegrante.jpg',
    },
  ];

  constructor(private router: Router) {}

  voltarMenu() {
    this.router.navigate(['/home']);
  }

  abrirModal(dev: { nome: string; bio: string; foto: string }) {
    this.devSelecionado = dev;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.devSelecionado = null;
  }
}
