import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TmdbMovie {  // <- Exportar a interface
  id: number;               // adiciona id para buscar vídeos
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface TmdbResponse {  // <- Exportar a interface
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

// Novas interfaces para vídeos
export interface TmdbVideo {
  id: string;
  key: string;      // chave do vídeo no YouTube
  name: string;
  site: string;     // exemplo: "YouTube"
  size: number;
  type: string;     // exemplo: "Trailer", "Teaser"
}

export interface TmdbVideoResponse {
  id: number;
  results: TmdbVideo[];
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '9707b375551b71a796776b9d75944a49';
  private baseUrl = 'https://api.themoviedb.org/3';
  apiUrl: any;

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number, language = 'pt-BR') {
  return this.http.get<TmdbResponse>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}&language=${language}`
  );
}

getMoviesByCategory(genreId: number, page: number, language = 'PT-BR') {
  return this.http.get<TmdbResponse>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}&language=${language}`
  );
}

getMovieFullDataByTitle(title: string, language = 'PT-BR') {
  return this.http.get<TmdbResponse>(
    `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(title)}&language=${language}`
  );
}

getMovieTranslations(movieId: number) {
  // Exemplo de endpoint: /movie/{movie_id}/translations
  return this.http.get<{ translations: any[] }>(
    `${this.apiUrl}/movie/${movieId}/translations?api_key=${this.apiKey}`
  );
}


  // Novo método para pegar vídeos de um filme pelo ID
  getMovieVideos(movieId: number): Observable<TmdbVideoResponse> {
    return this.http.get<TmdbVideoResponse>(
      `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=PT-BR`
    );
  }
}

