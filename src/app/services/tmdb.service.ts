import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TmdbMovie {
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '9707b375551b71a796776b9d75944a49';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Buscar filmes por categoria (genreId)
  getMoviesByCategory(genreId: number, page: number): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreId}&page=${page}`
    );
  }

  // Buscar dados completos de um filme por título
  getMovieFullDataByTitle(title: string): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${title}&language=pt-BR`
    );
  }

  // Buscar filmes populares
  getPopularMovies(page: number = 1): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${page}`
    );
  }
}
