import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { TmdbService, TmdbMovie, TmdbResponse } from '../services/tmdb.service';
import { lastValueFrom } from 'rxjs';

interface Filme {
  titulo: string;
  imagem: string;
  descricao: string;
  lancamento: string;
  nota: number;
  favorito: boolean;
}

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage {
  termoBusca: string = '';
  resultadosBusca: Filme[] = [];

  constructor(
    private tmdbService: TmdbService,
    private toastController: ToastController,
    private router: Router
  ) {}

  

  async buscarFilmes() {
    if (!this.termoBusca.trim()) {
      this.resultadosBusca = [];
      const toast = await this.toastController.create({
        message: 'Digite algo para buscar.',
        duration: 1500,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    try {
      const resposta: TmdbResponse = await lastValueFrom(
        this.tmdbService.getMovieFullDataByTitle(this.termoBusca)
      );

      this.resultadosBusca = resposta.results.map((filme: TmdbMovie) => ({
        titulo: filme.title,
        imagem: filme.poster_path
          ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
          : 'assets/default-movie.png',
        descricao: filme.overview || 'Descrição não disponível.',
        lancamento: filme.release_date || '',
        nota: filme.vote_average || 0,
        favorito: false,
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      const toast = await this.toastController.create({
        message: 'Erro ao buscar filmes.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  verDetalhes(filme: Filme) {
    // this.router.navigate(['/detalhes', filme.id]); // se quiser abrir página de detalhes
  }
}
