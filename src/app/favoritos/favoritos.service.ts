import { Injectable } from '@angular/core';

export interface Filme {
  titulo: string;
  imagem?: string;
  descricao?: string;
  lancamento?: string;
  nota?: number;
  favorito?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private filmes: Filme[] = [];

  listar(): Filme[] {
    return this.filmes;
  }

  adicionar(filme: Filme): void {
    if (!this.estaFavorito(filme.titulo)) {
      this.filmes.push(filme);
    }
  }

  remover(filme: Filme): void {
    this.filmes = this.filmes.filter(f => f.titulo !== filme.titulo);
  }

  estaFavorito(titulo: string): boolean {
    return this.filmes.some(filme => filme.titulo === titulo);
  }
}
