import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TmdbService, TmdbMovie, TmdbResponse } from '../services/tmdb.service'; // IMPORTAR tipos do serviço
import { lastValueFrom } from 'rxjs';

interface Noticia {
  titulo: string;
  descricao: string;
  imagem: string;
  trailerUrl: string;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class NoticiasPage implements OnInit {
  menuAberto = false;
  noticias: Noticia[] = [];

  constructor(private tmdbService: TmdbService) { }

  async ngOnInit() {
    await this.carregarNoticias();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  async carregarNoticias() {
  try {
    // Página 1
    const resposta1: TmdbResponse = await lastValueFrom(this.tmdbService.getPopularMovies(1));
    // Página 2
    const resposta2: TmdbResponse = await lastValueFrom(this.tmdbService.getPopularMovies(2));

    // Junta os resultados das duas páginas
    const todosFilmes = [...resposta1.results, ...resposta2.results];

    // Remove duplicados pelo 'id'
    const filmesUnicosMap = new Map<number, TmdbMovie>();
    for (const filme of todosFilmes) {
      if (!filmesUnicosMap.has(filme.id)) {
        filmesUnicosMap.set(filme.id, filme);
      }
    }
    const filmesUnicos = Array.from(filmesUnicosMap.values());

    // Agora gera o array de notícias sem duplicados
    this.noticias = filmesUnicos.slice(0, 35).map((filme: TmdbMovie) => ({
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