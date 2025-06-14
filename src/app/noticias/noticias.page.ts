import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { lastValueFrom } from 'rxjs';

interface Noticia {
  titulo: string;
  descricao: string;
  imagem: string;
  trailerUrl: string;
}

interface TmdbPopularResponse {
  results: Array<{
    title: string;
    overview: string;
    poster_path: string | null;
  }>;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class NoticiasPage implements OnInit {
  menuAberto = false;  // CONTROLE DO MENU LATERAL
  noticias: Noticia[] = [];

  constructor(private tmdbService: TmdbService) {}

  async ngOnInit() {
    await this.carregarNoticias();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  async carregarNoticias() {
    try {
      const resposta: TmdbPopularResponse = await lastValueFrom(this.tmdbService.getPopularMovies());
      this.noticias = resposta.results.slice(0, 10).map(filme => ({
        titulo: filme.title,
        descricao: filme.overview || 'Sem descrição.',
        imagem: filme.poster_path
          ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
          : 'assets/default-movie.png',
        trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(filme.title)}+trailer`
      }));
    } catch (erro) {
      console.error('Erro ao carregar notícias:', erro);
    }
  }
}
