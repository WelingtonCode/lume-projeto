import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  filmesFavoritos: Filme[] = [];
  menuAberto = false;

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit() {
    this.carregarFavoritos();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  carregarFavoritos() {
    this.filmesFavoritos = this.favoritosService.listar();
  }

  removerFavorito(filme: Filme) {
    this.favoritosService.remover(filme);
    this.carregarFavoritos(); // Atualiza a lista
  }
}
