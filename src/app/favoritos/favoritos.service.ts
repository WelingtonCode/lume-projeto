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

  constructor() {
    this.carregarFavoritos();
  }

  private salvarFavoritos() {
    localStorage.setItem('filmesFavoritos', JSON.stringify(this.filmes));
  }

  private carregarFavoritos() {
    const dados = localStorage.getItem('filmesFavoritos');
    if (dados) {
      this.filmes = JSON.parse(dados);
    }
  }

  listar(): Filme[] {
    return this.filmes;
  }

  adicionar(filme: Filme): void {
    if (!this.estaFavorito(filme.titulo)) {
      this.filmes.push(filme);
      this.salvarFavoritos(); // salva no localStorage
    }
  }

  remover(filme: Filme): void {
    this.filmes = this.filmes.filter(f => f.titulo !== filme.titulo);
    this.salvarFavoritos(); // atualiza localStorage
  }

  estaFavorito(titulo: string): boolean {
    return this.filmes.some(filme => filme.titulo === titulo);
  }
}
