import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCmsF5Xfgne6UtgXk6l2CyChEo5k2L6QSU",
  authDomain: "banco-dados-fab57.firebaseapp.com",
  databaseURL: "https://banco-dados-fab57-default-rtdb.firebaseio.com",
  projectId: "banco-dados-fab57",
  storageBucket: "banco-dados-fab57.appspot.com",
  messagingSenderId: "376183814403",
  appId: "1:376183814403:web:cc0b726dcf083f0dd41136",
  measurementId: "G-R7DZ590YQ6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class CadastroPage {
  usuario = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';

  constructor(private router: Router) {}

  cadastrar() {
    if (!this.usuario || !this.email || !this.telefone || !this.senha || !this.confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    set(ref(db, 'users/' + this.usuario), {
      email: this.email,
      phone: this.telefone,
      password: this.senha
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    }).catch((error) => {
      alert('Erro ao cadastrar: ' + error.message);
    });
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }
}
