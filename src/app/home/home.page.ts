import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TmdbService, TmdbResponse, TmdbMovie } from '../services/tmdb.service';
import { FavoritosService, Filme } from '../favoritos/favoritos.service';

interface Categoria {
  nome: string;
  filmes: Filme[];
  genreId: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categorias: Categoria[] = [
    { nome: 'Filmes em destaque', genreId: 28, filmes: [] },
    { nome: 'Ação', genreId: 28, filmes: [] },
    { nome: 'Drama', genreId: 18, filmes: [] },
    { nome: 'Comédia', genreId: 35, filmes: [] },
    { nome: 'Suspense', genreId: 53, filmes: [] },
    { nome: 'Terror', genreId: 27, filmes: [] },
    { nome: 'Policial', genreId: 80, filmes: [] },
  ];

  menuAberto = false;
  filmeExpandido: Filme | null = null;
  temaEscuroAtivo = false;

  // Para busca
  termoBusca: string = '';
  resultadosBusca: Filme[] = [];

  constructor(
    private tmdbService: TmdbService,
    private favoritosService: FavoritosService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarDetalhesFilmes();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  toggleFilmeExpandido(filme: Filme | null) {
    this.filmeExpandido = this.filmeExpandido === filme ? null : filme;
  }

  async toggleFavorito(filme: Filme) {
    filme.favorito = !filme.favorito;

    if (filme.favorito) {
      this.favoritosService.adicionar(filme);
      await this.exibirToast('Adicionado aos favoritos');
    } else {
      this.favoritosService.remover(filme);
      await this.exibirToast('Removido dos favoritos');
    }
  }

  async exibirToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      color: 'primary',
    });
    await toast.present();
  }

  async carregarDetalhesFilmes() {
    for (const categoria of this.categorias) {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const detalhes = await this.tmdbService
        .getMoviesByCategory(categoria.genreId, randomPage)
        .toPromise();

      if (detalhes && detalhes.results) {
        categoria.filmes = detalhes.results.map((filme: TmdbMovie) => ({
          titulo: filme.title,
          imagem: filme.poster_path
            ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
            : 'assets/default-movie.png',
          descricao: filme.overview || 'Descrição não disponível.',
          lancamento: filme.release_date || '',
          nota: filme.vote_average || 0,
          favorito: this.favoritosService.estaFavorito(filme.title),
        }));
      }
    }
  }

  async buscarFilmes() {
    if (!this.termoBusca.trim()) {
      this.resultadosBusca = [];
      return;
    }

    try {
      const resposta = await this.tmdbService
        .getMovieFullDataByTitle(this.termoBusca)
        .toPromise();

      if (resposta && resposta.results) {
        this.resultadosBusca = resposta.results.map((filme: TmdbMovie) => ({
          titulo: filme.title,
          imagem: filme.poster_path
            ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
            : 'assets/default-movie.png',
          descricao: filme.overview || 'Descrição não disponível.',
          lancamento: filme.release_date || '',
          nota: filme.vote_average || 0,
          favorito: this.favoritosService.estaFavorito(filme.title),
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      this.resultadosBusca = [];
    }
  }

  alternarTema() {
    this.temaEscuroAtivo = !this.temaEscuroAtivo;
    const body = document.body;

    if (this.temaEscuroAtivo) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
