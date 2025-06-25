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

  constructor(private http: HttpClient) { }

  getMoviesByCategory(genreId: number, page: number): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreId}&page=${page}`
    );
  }

  getMovieFullDataByTitle(title: string): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${title}&language=pt-BR`
    );
  }

  getPopularMovies(page: number = 1): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${page}`
    );
  }

  // Novo método para pegar vídeos de um filme pelo ID
  getMovieVideos(movieId: number): Observable<TmdbVideoResponse> {
    return this.http.get<TmdbVideoResponse>(
      `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=pt-BR`
    );
  }
}
