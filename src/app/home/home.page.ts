import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

interface Filme {
  titulo: string;
  imagem?: string;
  descricao?: string;
  lancamento?: string;
  nota?: number;
}

// Defining the TmdbMovie interface here
interface TmdbMovie {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface Categoria {
  nome: string;
  filmes: Filme[];
  genreId: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
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

  constructor(private tmdbService: TmdbService) {}

  ngOnInit() {
    this.carregarDetalhesFilmes();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  toggleFilmeExpandido(filme: Filme | null) {
    this.filmeExpandido = this.filmeExpandido === filme ? null : filme;
  }

  // Load random movies for each category
  async carregarDetalhesFilmes() {
    for (const categoria of this.categorias) {
      const randomPage = Math.floor(Math.random() * 10) + 1; // Random page (1-10)
      const detalhes: any = await this.tmdbService.getMoviesByCategory(categoria.genreId, randomPage).toPromise();

      // Update the category's movie list with random TMDb data
      categoria.filmes = detalhes.results.map((filme: TmdbMovie) => ({
        titulo: filme.title,
        imagem: filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'assets/default-movie.png',
        descricao: filme.overview || 'Descrição não disponível.',
        lancamento: filme.release_date || '',
        nota: filme.vote_average || 0
      }));
    }
  }
}
