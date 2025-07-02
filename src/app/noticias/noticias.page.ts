import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TmdbService, TmdbMovie, TmdbResponse } from '../services/tmdb.service';
import { lastValueFrom } from 'rxjs';

interface Noticia {
  titulo: string;
  conteudo: string;
  imagem: string;
  trailerUrl: string;
  data: string;
  autor: string;
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

  constructor(private tmdbService: TmdbService) {}

  async ngOnInit() {
    await this.carregarNoticias();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  async carregarNoticias() {
    try {
      const resposta1: TmdbResponse = await lastValueFrom(this.tmdbService.getPopularMovies(1));
      const resposta2: TmdbResponse = await lastValueFrom(this.tmdbService.getPopularMovies(2));

      const todosFilmes = [...resposta1.results, ...resposta2.results];
      const filmesUnicosMap = new Map<number, TmdbMovie>();

      for (const filme of todosFilmes) {
        if (!filmesUnicosMap.has(filme.id)) {
          filmesUnicosMap.set(filme.id, filme);
        }
      }

      const filmesUnicos = Array.from(filmesUnicosMap.values());

      const modelosTitulo = [
        (title: string) => `🎬 ${title} estreia com grandes expectativas`,
        (title: string) => `🚨 Bastidores de ${title} agitam os fãs de cinema`,
        (title: string) => `🎥 ${title} conquista a crítica internacional`,
        (title: string) => `🔥 Polêmica? ${title} divide opiniões nas redes`,
        (title: string) => `⭐ ${title} promete dominar as bilheteiras em julho`
      ];

      const modelosConteudo = [
        (overview: string, title: string) => overview || `O novo sucesso "${title}" chega aos cinemas com muita expectativa e promete surpreender o público.`,
        (overview: string, title: string) => overview || `"${title}" é o tipo de filme que você vai comentar por semanas. Veja por que ele está se destacando.`,
        (overview: string, title: string) => overview || `Críticos apontam "${title}" como um dos lançamentos mais promissores do ano.`,
        (overview: string, title: string) => overview || `Com cenas impactantes e um elenco de peso, "${title}" chama atenção desde o anúncio.`,
        (overview: string, title: string) => overview || `O enredo de "${title}" está sendo debatido por fãs e especialistas do mundo todo.`
      ];

      this.noticias = filmesUnicos.slice(0, 35).map((filme: TmdbMovie, index: number) => {
        const modeloTitulo = modelosTitulo[index % modelosTitulo.length];
        const modeloConteudo = modelosConteudo[index % modelosConteudo.length];

        return {
          titulo: modeloTitulo(filme.title),
          conteudo: modeloConteudo(filme.overview, filme.title),
          imagem: filme.poster_path
            ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
            : 'assets/default-movie.png',
          trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(filme.title)}+trailer`,
          data: this.gerarDataAleatoria(index),
          autor: this.gerarAutorAleatorio()
        };
      });

    } catch (erro) {
      console.error('Erro ao carregar notícias:', erro);
    }
  }

  gerarAutorAleatorio(): string {
    const autores = ['Ana Souza', 'Carlos Lima', 'Mariana Ribeiro', 'João Pedro', 'Renata Duarte'];
    return autores[Math.floor(Math.random() * autores.length)];
  }

  gerarDataAleatoria(index: number): string {
    const diasAtras = index + 1;
    const data = new Date();
    data.setDate(data.getDate() - diasAtras);
    return data.toLocaleDateString('pt-BR');
  }
}
