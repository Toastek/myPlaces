import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { LogInPage } from "./../log-in/log-in";

import { MyFirebaseService } from "./../../services/myfirebase.service";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private myFirebaseService: MyFirebaseService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignInPage");
  }

  //on pop pour éviter de pouvoir remplir la stack en boucle avec des views
  // à remplacer par popToRoot à l'avenir sûrement
  onGoBackToLogin() {
    this.navCtrl.pop();
  }

  onSignin(form: NgForm) {
    this.myFirebaseService
      .signInWithEmail(form.value.email, form.value.password)
      .then(success => {
        console.log(success);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        console.log(error.message);
      });

    //this.navCtrl.push(SignInPage);
    console.log(form);
  }
}
