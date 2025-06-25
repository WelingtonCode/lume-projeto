import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { getDatabase, ref, get, child } from 'firebase/database';
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
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  email = '';
  senha = '';

  constructor(private router: Router, private alertCtrl: AlertController) { }

  async irParaHome() {
    if (!this.email || !this.senha) {
      this.mostrarAlerta('Erro', 'Preencha todos os campos.');
      return;
    }

    const emailKey = this.email.replace('.', '_').replace('@', '_');
    const userRef = ref(db);

    try {
      const snapshot = await get(child(userRef, `users/${emailKey}`));
      if (snapshot.exists()) {
        const dados = snapshot.val();
        if (dados.password === this.senha) {
          this.router.navigate(['/home']);
        } else {
          this.mostrarAlerta('Erro', 'Senha incorreta.');
        }
      } else {
        this.mostrarAlerta('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      this.mostrarAlerta('Erro', 'Erro ao acessar o banco de dados.');
      console.error(error);
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}
