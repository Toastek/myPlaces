import { MyFirebaseService } from "./../../services/myfirebase.service";
import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { SignInPage } from "./../sign-in/sign-in";
import { HomePage } from "./../home/home";

@IonicPage()
@Component({
  selector: "page-log-in",
  templateUrl: "log-in.html"
})
export class LogInPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myFirebaseService: MyFirebaseService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LogInPage");
  }

  onLogin(form: NgForm) {
    this.myFirebaseService
      .logInWithEmail(form.value.email, form.value.password)
      .then(success => {
        console.log(success);
        this.myFirebaseService.fetchUserDataFromFire();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        console.log(error.message);
      });

    console.log(form);
  }

  //on push pour pouvoir pop derrière si besoin, popToRoot sera utilisable quand login page sera set en tant que root page de l'app
  onGoToSignin() {
    this.navCtrl.push(SignInPage);
  }

  onGoToHomePage() {
    this.navCtrl.push(HomePage);
  }
}
