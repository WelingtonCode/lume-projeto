import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // <-- Adicionado aqui
import { FavoritosService } from './favoritos.service';

interface Filme {
  titulo: string;
  imagem?: string;
  descricao?: string;
  lancamento?: string;
  nota?: number;
  favorito?: boolean;
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],  // <-- RouterModule adicionado aqui
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  filmesFavoritos: Filme[] = [];
  menuAberto = false; // ✅ ADICIONADO

  constructor(private favoritosService: FavoritosService) { }

  ngOnInit() {
    this.filmesFavoritos = this.favoritosService.listar();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
