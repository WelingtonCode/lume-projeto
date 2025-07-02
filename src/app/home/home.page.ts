import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TmdbService, TmdbMovie } from '../services/tmdb.service';
import { FavoritosService } from '../favoritos/favoritos.service';

export interface Filme {
  id: number;
  titulo: string;
  imagem: string;
  descricao: string;
  lancamento: string;
  nota: number;
  favorito: boolean;
  avaliacoes?: Avaliacao[]; // opcional, caso queira usar
}

export interface Avaliacao {
  usuario: string;
  comentario: string;
  nota: number;
  data: string;
}

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
    { nome: 'Filmes em destaque', genreId: 0, filmes: [] }, // Para filmes populares
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

  termoBusca: string = '';
  resultadosBusca: Filme[] = [];

  avaliacoes: Avaliacao[] = [];
  novaAvaliacao: Avaliacao = { usuario: '', comentario: '', nota: 10, data: '' };

  constructor(
    private tmdbService: TmdbService,
    private favoritosService: FavoritosService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarDetalhesFilmes();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  async toggleFilmeExpandido(filme: Filme | null) {
    this.filmeExpandido = this.filmeExpandido === filme ? null : filme;

    if (filme) {
      this.carregarAvaliacoes(filme);
    }
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
    const filmesUsadosIds = new Set<number>();

    for (let i = 0; i < this.categorias.length; i++) {
      const categoria = this.categorias[i];
      let filmesAcumulados: TmdbMovie[] = [];

      

      if (categoria.genreId === 0) {
        // Filmes em destaque: filmes populares
        for (let page = 1; page <= 3; page++) {
          const detalhes = await this.tmdbService
            .getPopularMovies(page, 'pt-BR') // Passa idioma pt-BR
            .toPromise();

          if (detalhes && detalhes.results) {
            filmesAcumulados = filmesAcumulados.concat(detalhes.results);
          }
        }
      } else {
        // Filmes por categoria (gênero)
        for (let page = 1; page <= 3; page++) {
          const detalhes = await this.tmdbService
            .getMoviesByCategory(categoria.genreId, page, 'pt-BR') // Passa idioma pt-BR
            .toPromise();

          if (detalhes && detalhes.results) {
            filmesAcumulados = filmesAcumulados.concat(detalhes.results);
          }
        }
      }

      // Remove duplicados dentro da categoria
      const filmesUnicosMap = new Map<number, TmdbMovie>();
      filmesAcumulados.forEach((filme) => {
        if (!filmesUnicosMap.has(filme.id)) {
          filmesUnicosMap.set(filme.id, filme);
        }
      });

      let filmesFiltrados: TmdbMovie[];

      if (i === 0) {
        // Na categoria destaque, pega todos os filmes únicos
        filmesFiltrados = Array.from(filmesUnicosMap.values());
        filmesFiltrados.forEach((filme) => filmesUsadosIds.add(filme.id));
      } else {
        // Nas outras categorias, filtra para não repetir filmes já usados
        filmesFiltrados = Array.from(filmesUnicosMap.values()).filter(
          (filme) => !filmesUsadosIds.has(filme.id)
        );
        filmesFiltrados.forEach((filme) => filmesUsadosIds.add(filme.id));
      }

      categoria.filmes = filmesFiltrados.map((filme: TmdbMovie) => ({
        id: filme.id,
        titulo: filme.title,
        imagem: filme.poster_path
          ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
          : 'assets/default-movie.png',
        descricao: filme.overview || 'Descrição não disponível.',
        lancamento: filme.release_date || '',
        nota: filme.vote_average || 0,
        favorito: this.favoritosService.estaFavorito(filme.title),
        avaliacoes: [],
      }));
    }
  }

  async buscarFilmes() {
    if (!this.termoBusca.trim()) {
      this.resultadosBusca = [];
      return;
    }

    try {
      const resposta = await this.tmdbService
        .getMovieFullDataByTitle(this.termoBusca, 'pt-BR') // Passa idioma pt-BR
        .toPromise();

      if (resposta && resposta.results) {
        this.resultadosBusca = resposta.results.map((filme: TmdbMovie) => ({
          id: filme.id,
          titulo: filme.title,
          imagem: filme.poster_path
            ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
            : 'assets/default-movie.png',
          descricao: filme.overview || 'Descrição não disponível.',
          lancamento: filme.release_date || '',
          nota: filme.vote_average || 0,
          favorito: this.favoritosService.estaFavorito(filme.title),
          avaliacoes: [],
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

  // Avaliações via localStorage

  carregarAvaliacoes(filme: Filme) {
    if (!filme.id) {
      this.avaliacoes = [];
      return;
    }
    const avaliacoesSalvas = localStorage.getItem(`avaliacoes-filme-${filme.id}`);
    this.avaliacoes = avaliacoesSalvas ? JSON.parse(avaliacoesSalvas) : [];
    filme.nota = this.calcularNotaMedia(this.avaliacoes);
  }

  adicionarAvaliacao() {
    if (!this.filmeExpandido?.id) return;

    this.novaAvaliacao.data = new Date().toLocaleDateString('pt-BR');
    this.avaliacoes.push({ ...this.novaAvaliacao });

    localStorage.setItem(
      `avaliacoes-filme-${this.filmeExpandido.id}`,
      JSON.stringify(this.avaliacoes)
    );

    this.filmeExpandido.nota = this.calcularNotaMedia(this.avaliacoes);

    this.novaAvaliacao = { usuario: '', comentario: '', nota: 10, data: '' };
    this.exibirToast('Avaliação adicionada!');
  }

  calcularNotaMedia(avaliacoes: Avaliacao[]): number {
    if (avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
    return +(soma / avaliacoes.length).toFixed(1);
  }
}
