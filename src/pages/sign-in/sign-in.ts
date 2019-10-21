import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { LogInPage } from "./../log-in/log-in";

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignInPage");
  }

  //on pop pour éviter de pouvoir remplir la stack en boucle avec des views
  // à remplacer par popToRoot à l'avenir sûrement
  onGoBackToLogin() {
    this.navCtrl.pop();
  }

  onSignin(form: NgForm) {
    console.log(form);
  }
}
