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

interface Categoria {
  nome: string;
  filmes: Filme[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categorias: Categoria[] = [
    {
      nome: 'Filmes em destaque',
      filmes: [
        { titulo: 'Duna: Parte Dois' },
        { titulo: 'A Substância' },
        { titulo: 'Oppenheimer' },
        { titulo: 'Ainda Estou Aqui' },
        { titulo: 'Barbie' },
        { titulo: 'Tudo em Todo Lugar ao Mesmo Tempo' },
        { titulo: 'Wicked' },
        { titulo: 'O Dublê' },
      ],
    },
    {
      nome: 'Ação',
      filmes: [
        { titulo: 'Batman - O Cavaleiro Das Trevas' },
        { titulo: 'Capitão América: Guerra Civil' },
        { titulo: 'Vingadores: Guerra Infinita' },
        { titulo: 'John Wick' },
        { titulo: 'Bastardos Inglórios' },
        { titulo: 'Logan' },
        { titulo: 'Tróia' },
        { titulo: 'Top Gun: Maverick' },
      ],
    },
    {
      nome: 'Drama',
      filmes: [
        { titulo: 'O Poderoso Chefão' },
        { titulo: 'À Procura da Felicidade' },
        { titulo: 'A Lista de Schindler' },
        { titulo: 'Forrest Gump - O Contador de Histórias' },
        { titulo: 'À Espera de um Milagre' },
        { titulo: 'O Resgate do Soldado Ryan' },
        { titulo: 'O Silêncio dos Inocentes' },
        { titulo: 'Intocáveis' },
      ],
    },
    {
      nome: 'Comédia',
      filmes: [
        { titulo: 'O Auto da Compadecida' },
        { titulo: 'Se Beber Não Case' },
        { titulo: 'Curtindo a Vida Adoidado' },
        { titulo: 'O Show de Truman' },
        { titulo: 'Marley & Eu' },
        { titulo: '10 Coisas que Eu Odeio em Você' },
        { titulo: 'Brilho Eterno de uma Mente Sem Lembranças' },
        { titulo: 'As Branquelas' },
      ],
    },
    {
      nome: 'Suspense',
      filmes: [
        { titulo: 'O Código Da Vinci' },
        { titulo: 'O Sexto Sentido' },
        { titulo: 'Seven - Os Sete Crimes Capitais' },
        { titulo: 'Cães de Aluguel' },
        { titulo: 'Clube da Luta' },
        { titulo: 'Prenda-me Se For Capaz' },
        { titulo: 'Ilha do Medo' },
        { titulo: 'Corra!' },
      ],
    },
    {
      nome: 'Terror',
      filmes: [
        { titulo: 'Annabelle' },
        { titulo: 'Invocação do Mal' },
        { titulo: 'Alien o 8º Passageiro' },
        { titulo: 'O Iluminado' },
        { titulo: 'Constantine' },
        { titulo: 'O Labirinto do Fauno' },
        { titulo: 'A Freira' },
        { titulo: 'Halloween' }, 
      ],
    },
    {
      nome: 'Policial',
      filmes: [
        { titulo: 'Cidade de Deus' },
        { titulo: 'Scarface' },
        { titulo: 'Pulp Fiction - Tempo de Violência' },
        { titulo: 'Os Infiltrados' },
        { titulo: 'Tropa de Elite 2' },
        { titulo: 'Os Intocáveis' },
        { titulo: 'Taxi Driver' },
        { titulo: 'Janela Indiscreta' },
      ],
    },
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

  // Corrigido para aceitar Filme | null
  toggleFilmeExpandido(filme: Filme | null) {
    this.filmeExpandido = this.filmeExpandido === filme ? null : filme;
  }

  async carregarDetalhesFilmes() {
    for (const categoria of this.categorias) {
      for (const filme of categoria.filmes) {
        const detalhes: any = await this.tmdbService.getMovieFullDataByTitle(filme.titulo);
        if (detalhes) {
          filme.imagem = `https://image.tmdb.org/t/p/w500${detalhes.poster_path}`;
          filme.descricao = detalhes.overview;
          filme.lancamento = detalhes.release_date;
          filme.nota = detalhes.vote_average;
        } else {
          filme.imagem = 'assets/default-movie.png';
          filme.descricao = 'Descrição não disponível.';
          filme.lancamento = '';
          filme.nota = 0;
        }
      }
    }
  }
}
