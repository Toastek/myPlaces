import { Place } from "./../models/place.model";
import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, QuerySnapshot } from "angularfire2/firestore";
import { UploadMetadata, UploadTask } from "@angular/fire/storage/interfaces";
import { Observable, Subscription } from "rxjs";
import { DateTime } from "ionic-angular";

@Injectable()
export class MyFirebaseService {
  public user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private storage: Storage
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

deletePlaceFromFirebase(place : Place) {
    let storageRef = firebase.storage().ref();
    this.fireStore.collection(this.user.uid).doc(place.id).delete().then(result => {
    console.log('deleteplace result');
    console.log(result);
   }, error => {
     console.log('deleteplace error');
     console.log(error);
   });
   storageRef.child(this.user.uid).child(place.storeID).delete();
  }

  pushPlaceToFirebase(place: Place) {
    this.fireStore
      .collection(this.user.uid)
      .doc(place.id)
      .set({
        title: place.title,
        description: place.description,
        location: place.location,
        imagePath: place.imagePath,
        id: place.id,
        storeID: place.storeID
      })
      .then(
        result => {
          console.log("place pushed on firebase collection " + this.user.uid);
        },
        error => {
          console.log(error);
        }
      );
  }

  uploadImageToFirestore(imageData: string, name: string): UploadTask {
    var md: UploadMetadata = {
      contentType: "image/jpeg"
    };
    let storageRef = firebase.storage().ref();
    return storageRef
      .child(this.user.uid)
      .child(name)
      .putString(imageData, "base64", md);
  }

  getImageUrlFromFirestore(name: string): Promise<any> {
    let storageRef = firebase.storage().ref();
    return storageRef
      .child(this.user.uid)
      .child(name)
      .getDownloadURL();
  }

  getFirebaseUserData(): Promise<QuerySnapshot<any>> {
    return this.fireStore
      .collection(this.user.uid)
      .get()
      .toPromise();
  }
}
