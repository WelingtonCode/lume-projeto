import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '9707b375551b71a796776b9d75944a49'; // Sua API key
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Método para obter filmes por categoria (genreId)
  getMoviesByCategory(genreId: number, page: number) {
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreId}&page=${page}`);
  }

  // Método para buscar filme completo por título
  getMovieFullDataByTitle(title: string) {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(title)}&language=pt-BR`);
  }
}
