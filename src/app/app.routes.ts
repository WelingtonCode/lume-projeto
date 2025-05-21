import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu.page').then((m) => m.MenuPage),
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
];



