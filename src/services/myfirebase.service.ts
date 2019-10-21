import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class MyFirebaseService {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    console.log("MyFirebaseService constructed");
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithEmail(email: string, password: string) {
    console.log("Sign in with email");
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logInWithEmail(email: string, password: string) {
    console.log("Log in with email");
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
