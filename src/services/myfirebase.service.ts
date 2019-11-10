import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class MyFirebaseService {
  private user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
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

  getUserEmail() {
    if (this.isUserAuthenticated) {
      return this.user.email;
    }
  }

  isUserAuthenticated(): boolean {
    if (this.user == null) {
      return false;
    } else {
      return true;
    }
  }

  fetchUserDataFromFire() {
    // var toto = this.fireStore.collection("userData").doc("jp5NcAURHWh0FS27xXZk");
    // console.log("userData = ");
    // console.log(toto);
    this.fireStore
      .collection("userData")
      .get()
      .subscribe(
        resolve => {
          console.log("fetchfromFB userData success = ");
          console.log(resolve);
        },
        reject => {
          console.log("fetchfromFB userData error = ");
          console.log(reject);
        }
      );
  }

  // fetchUserDataFromFire() {
  //   // var toto = this.fireStore.collection("userData").doc("jp5NcAURHWh0FS27xXZk");
  //   // console.log("userData = ");
  //   // console.log(toto);
  //   this.fireStore
  //     .collection("userData")
  //     .doc("jp5NcAURHWh0FS27xXZk")
  //     .valueChanges()
  //     .subscribe(result => {
  //       console.log("userData == ");
  //       console.log(result);
  //     }),
  //     error => {
  //       console.log(error);
  //     };
  // }

  //firebase model for a place
  //  id
  //  title: string,
  // description: string,
  // location: Location, => lat, long
  // imageUrl: string
}
