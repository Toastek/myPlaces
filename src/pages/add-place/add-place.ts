import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  LoadingController,
  ToastController,
  Events,
  normalizeURL
} from "ionic-angular";
import { NgForm } from "@angular/forms";

import { Geolocation, Camera } from "ionic-native";

import { SetLocationPage } from "./../set-location/set-location";
import { Location } from "./../../models/location.model";

@IonicPage()
@Component({
  selector: "page-add-place",
  templateUrl: "add-place.html"
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = "";

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private event: Events
  ) {
    this.onLocate();
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location,
      isSet: this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocate() {
    const myLoader = this.loadingCtrl.create({
      content: "Getting your position..."
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
          message: "Couldn't achieve to get your location",
          duration: 2500
        });
        myToast.present();
      });
    myLoader.dismiss();
  }

  onTakePhoto() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(imageData => {
        this.imageUrl = imageData;
        this.imageUrl = normalizeURL(this.imageUrl);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
