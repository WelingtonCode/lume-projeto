import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'equipe',
    loadComponent: () => 
      import('./equipe/equipe.page').then( m => m.EquipePage),
  },
  {
    path: 'favoritos',
    loadComponent: () => 
      import('./favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'noticias',
    loadComponent: () => 
      import('./noticias/noticias.page').then( m => m.NoticiasPage)
  },
  {
    path: 'buscar',
    loadComponent: () =>
       import('./buscar/buscar.page').then( m => m.BuscarPage)
  },
];



