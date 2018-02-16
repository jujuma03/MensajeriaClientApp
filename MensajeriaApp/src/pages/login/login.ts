import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import firebase from "firebase";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;


  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private admob: AdMobFree, private platform: Platform) {

  }

  ionViewDidLoad(){

    if(this.platform.is('cordova')){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-2525998564536599/5544494393',
      isTesting: false,
      autoShow: true
     };
     this.admob.banner.config(bannerConfig);
     
     this.admob.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
      }
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  async login(user: User){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.correo, user.contrasena);
      if(result){ 
        this.alert('Éxito, tú estas conectado');
        this.navCtrl.setRoot('Main'); 
      }
    } catch(e) {
      console.error(e);
      this.alert(e.message);
    }
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  loginRedes(provider){
    let signInProvider = null;
    switch (provider) {
      case "facebook":
        signInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google":
        signInProvider = new firebase.auth.GoogleAuthProvider();
    }

      try{  
        this.afAuth.auth.signInWithPopup(signInProvider).then( res=> {
          if(res){
            this.alert('Éxito, tú estas conectado');
            this.navCtrl.setRoot('Main'); 
            }
          }
        )
      } catch(e) {
        console.error(e);
        this.alert(e.message);
      }

  }
}
