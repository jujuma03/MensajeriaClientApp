import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  user = {} as User;
  usuarioData: AngularFireObject<User>;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.user.loggedin = true;
        this.user.correo = data.email;
        this.user.nombre = data.displayName;
        this.user.fotoPerfil = data.photoURL;
        this.user.telefono = data.phoneNumber;    
      }
      
    } );
  }

  logout(){
    this.afAuth.auth.signOut();

    this.user.loggedin = false;
    this.navCtrl.push("LoginPage");
  }

}
