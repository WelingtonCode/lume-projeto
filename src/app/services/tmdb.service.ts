import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '9707b375551b71a796776b9d75944a49'; // Coloque sua chave aqui
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovie(title: string) {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(title)}&language=pt-BR`;
    return this.http.get(url);
  }

  getMovieDetails(id: number) {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get(url);
  }

  // Função que junta tudo: busca por título e retorna os detalhes completos
  async getMovieFullDataByTitle(title: string) {
    const searchResult: any = await firstValueFrom(this.searchMovie(title));
    if (searchResult.results && searchResult.results.length > 0) {
      const movieId = searchResult.results[0].id;
      return firstValueFrom(this.getMovieDetails(movieId));
    }
    return null;
  }
}
