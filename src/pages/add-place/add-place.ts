import { MyFirebaseService } from "./../../services/myfirebase.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  LoadingController,
  ToastController,
  normalizeURL,
  DateTime
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { Geolocation, Camera, File, Entry } from "ionic-native";

import { SetLocationPage } from "./../set-location/set-location";

import { Location } from "./../../models/location.model";
import { timer } from "rxjs";
import { Place } from "../../models/place.model";

declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-add-place",
  templateUrl: "add-place.html"
})
export class AddPlacePage {
  location: Location = {
    lat: 45.306806,
    lng: 5.881854
  };
  locationIsSet = false;
  prefixBase64: string = "data:image/jpeg;base64,";
  presenterBase64: string = "";
  imageUrl: string = "";
  base64Image: string = "";

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private myFirebaseService: MyFirebaseService
  ) {
    //this.onLocate();
  }

  onSubmit(form: NgForm) {
    var storeID = Date.now().toLocaleString();
    this.myFirebaseService
      .uploadImageToFirestore(this.base64Image, storeID)
      .then(result => {
        this.myFirebaseService.getImageUrlFromFirestore(storeID).then(url => {
          console.log(form);
          this.imageUrl = url;
          var docID : string = this.myFirebaseService.user.uid+storeID;
          this.myFirebaseService.pushPlaceToFirebase(
            new Place(
              form.value.title,
              form.value.description,
              this.location,
              this.imageUrl,
              docID,
              storeID
            )
          );
          const toast = this.toastCtrl.create({
            message: "L'endroit \"" + form.value.title + '" a été sauvegardé',
            duration: 2500
          });
          toast.present();
          //reset form et map après form submission
          form.reset();
          this.location = {
            lat: 45.306806,
            lng: 5.881854
          };
          this.imageUrl = "";
          this.locationIsSet = false;
        });
      });
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location,
      isSet: this.locationIsSet
    });
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
    modal.present();
  }

  onLocate() {
    const myLoader = this.loadingCtrl.create({
      content: "Localisation en cours..."
    });

    Geolocation.getCurrentPosition()
      .then(location => {
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(error => {
        console.log("myError : " + error);
        const myToast = this.toastCtrl.create({
          message: "Votre localisation n'a pas pu être déterminée !",
          duration: 2500
        });
        myToast.present();
      });
    myLoader.dismiss();
  }

  onTakePhoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(async imageData => {
        /*
        let win: any = window; // hack compilator
        this.imageUrl = win.Ionic.WebView.convertFileSrc(imageData);
*/
        this.base64Image = imageData;
        this.presenterBase64 = this.prefixBase64 + this.base64Image;
      })
      .catch(error => {
        console.log("error onTakePhoto : " + error);
        const toast = this.toastCtrl.create({
          message: "L'image n'a pas pu être enregistrée, veuillez réessayer !",
          duration: 3500
        });
        toast.present();
      });
  }
}
