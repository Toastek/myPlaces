import { MyFirebaseService } from "./../../services/myfirebase.service";
import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { SignInPage } from "./../sign-in/sign-in";
import { HomePage } from "./../home/home";

@IonicPage()
@Component({
  selector: "page-log-in",
  templateUrl: "log-in.html"
})
export class LogInPage {

  hideToast : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myFirebaseService: MyFirebaseService,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LogInPage");
  }

  onLogin(form: NgForm) {
    this.myFirebaseService
      .logInWithEmail(form.value.email, form.value.password)
      .then(success => {
        console.log(success);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        console.log(error.message);
        if (!this.hideToast) {
          const toast = this.toastCtrl.create({
            message:
              "Veuillez rentrer une adresse et un mot de passe valides, et vérifier votre connexion à internet",
            duration: 5000
          });
          toast.present();
        }
      });

    console.log(form);
  }

  //on push pour pouvoir pop derrière si besoin, popToRoot sera utilisable quand login page sera set en tant que root page de l'app
  onGoToSignin() {
    this.hideToast = true;
    this.navCtrl.push(SignInPage);
  }
}
