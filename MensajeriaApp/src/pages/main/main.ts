import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the Page tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class Main {

  welcomeRoot = 'WelcomePage'
  mapRoot = 'MapPage'
  misViajesRoot = 'MisViajesPage'
  perfilRoot = 'PerfilPage'

  user = {} as User;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {}


}
