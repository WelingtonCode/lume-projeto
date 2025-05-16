import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage {
  categorias = [
    {
      nome: 'Filmes em destaque',
      filmes: [
        { titulo: 'Coringa', imagem: 'assets/joker.jpeg' },
        { titulo: 'Flash', imagem: 'assets/Flash.webp' },
        { titulo: 'Aquaman 2', imagem: 'assets/aqua.jpeg' },
         { titulo: 'Duna: Parte Dois', imagem: 'assets/duna.webp' },
        { titulo: 'Oppenheimer', imagem: 'assets/oppenheimer.webp' },
        { titulo: 'Homem Aranha: Sem Volta Para Casa', imagem: 'assets/homemaranha.webp' },
      ],
    },
    {
      nome: 'Ação',
      filmes: [
        { titulo: 'Mad Max: Estrada da Fúria', imagem: 'assets/madmax.jpg' },
        { titulo: 'John Wick 4', imagem: 'assets/johnwick.jpg' },
        { titulo: 'Gladiador', imagem: 'assets/gladiador.jpg' },
         { titulo: 'Rambo', imagem: 'assets/rambo.webp' },
        { titulo: 'Jack Reacher: O Último Tiro', imagem: 'assets/jackreacher.webp' },
        { titulo: 'Velozes e Furiosos 9', imagem: 'assets/velozesefuriosos9.webp' },
      ],
    },
    {
      nome: 'Aventura',
      filmes: [
        { titulo: 'Indiana Jones: Os Caçadores da Arca Perdida', imagem: 'assets/indianajones.webp' },
        { titulo: 'Jumanji: Bem-Vindo à Selva', imagem: 'assets/jumanji.webp' },
        { titulo: 'Uncharted: Fora do Mapa', imagem: 'assets/uncharted.webp' },
        { titulo: 'O Hobbit> Uma Jornada Inesperada', imagem: 'assets/hobbit.webp' },
        { titulo: 'Harry Potter e a Câmara Secreta', imagem: 'assets/harrypotter.webp' },
        { titulo: 'Viagem ao Centro da Terra', imagem: 'assets/viagemaocentrodaterra.webp' },
      ],
    },
    {
      nome: 'Comédia',
      filmes: [
        { titulo: 'Gente Grande', imagem: 'assets/gentegrande.webp' },
        { titulo: 'As Branquelas', imagem: 'assets/asbranquelas.webp' },
        { titulo: 'Click', imagem: 'assets/click.webp' },
         { titulo: 'Amizade Colorida', imagem: 'assets/amizadecolorida.webp' },
        { titulo: 'Ted 2', imagem: 'assets/ted2.webp' },
        { titulo: 'Se Beber Não Case', imagem: 'assets/sebebernaocase.webp' },
      ],
    },
    {
      nome: 'Terror',
      filmes: [
        { titulo: 'Invocação do Mal', imagem: 'assets/invocaçaodomal.webp' },
        { titulo: 'It - A Coisa', imagem: 'assets/itacoisa.webp' },
        { titulo: 'Corra!', imagem: 'assets/corra.webp' },
        { titulo: 'Hereditário', imagem: 'assets/hereditario.webp' },
        { titulo: 'O Babadook', imagem: 'assets/babadook.webp' },
        { titulo: 'Annabelle!', imagem: 'assets/annabelle.webp' },
      ],
    },
    {
      nome: 'Suspense',
      filmes: [
        { titulo: 'Fragmentado', imagem: 'assets/fragmentado.webp' },
        { titulo: 'Amnésia', imagem: 'assets/amnesia.webp' },
        { titulo: 'Seven: Os Sete Crimes Capitais', imagem: 'assets/seven.webp' },
        { titulo: 'O Sexto Sentido', imagem: 'assets/osextosentido.webp' },
        { titulo: 'Ilha Do Medo', imagem: 'assets/ilhadomedo.webp' },
        { titulo: 'O Silêncio dos Inocentes', imagem: 'assets/osilenciodosinocentes.webp' },
      ],
    },
    {
      nome: 'Drama',
      filmes: [
        { titulo: 'À Procura da Felicidade', imagem: 'assets/aprocuradafelicidade.webp' },
        { titulo: 'O Pianista', imagem: 'assets/opianista.webp' },
        { titulo: 'Clube da Luta', imagem: 'assets/clubedaluta.webp' },
        { titulo: 'A Lista de Schindler', imagem: 'assets/alistadeschindler.webp' },
        { titulo: 'Forrest Gump', imagem: 'assets/forrestgump.webp' },
        { titulo: 'O Poderoso Chefão', imagem: 'assets/opoderosochefao.webp' },
      ],
    },
    {
      nome: 'Infantil',
      filmes: [
        { titulo: 'Toy Story 4', imagem: 'assets/toystory4.webp' },
        { titulo: 'O Rei Leão', imagem: 'assets/oreileao.webp' },
        { titulo: 'Tarzan', imagem: 'assets/tarzan.webp' },
        { titulo: 'Viva: A Vida é Uma Festa', imagem: 'assets/vivaavidaeumafesta.webp' },
        { titulo: 'Aladdin', imagem: 'assets/aladdin.webp' },
        { titulo: 'Divertida Mente 2', imagem: 'assets/divertidamente2.webp' },
      ],
    },
    {
      nome: 'Policial',
      filmes: [
        { titulo: 'Tropa de Elite', imagem: 'assets/tropadeelite.webp' },
        { titulo: 'Infiltrados', imagem: 'assets/infiltrados.webp' },
        { titulo: 'Cidade de Deus', imagem: 'assets/cidadededeus.webp' },
           { titulo: 'Bad Boys', imagem: 'assets/badboys.webp' },
        { titulo: 'A Hora do Rush', imagem: 'assets/ahoradorush.webp' },
        { titulo: 'Trem Bala', imagem: 'assets/trembala.webp' },
      ],
    },
  ];
}

