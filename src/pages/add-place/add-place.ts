import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  LoadingController,
  ToastController,
  normalizeURL
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { Geolocation, Camera, File, Entry } from "ionic-native";

import { SetLocationPage } from "./../set-location/set-location";

import { PlacesService } from "./../../services/places.service";
import { Location } from "./../../models/location.model";

declare var cordova: any;

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
    private placesService: PlacesService
  ) {
    //this.onLocate();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.placesService.addPlace(
      form.value.title,
      form.value.description,
      this.location,
      this.imageUrl
    );
    const toast = this.toastCtrl.create({
      message: "L'endroit \"" + form.value.title + '" a été sauvegardé',
      duration: 2500
    });
    toast.present();
    //reset form et map après form submission
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = "";
    this.locationIsSet = false;
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
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(async imageData => {
        this.imageUrl = normalizeURL(imageData);
        console.log("image normalize: " + this.imageUrl);
        let win: any = window; // hack compilator
        this.imageUrl = win.Ionic.WebView.convertFileSrc(imageData);
        console.log("image convertSrc : " + this.imageUrl);
        //const currentName = this.imageUrl.replace(/^.*[\\\/]/, "");
        //debugger;
        //const path = this.imageUrl.replace(/[^\/]*$/, "");
        // File.moveFile(
        //   path,
        //   currentName,
        //   cordova.file.dataDirectory,
        //   currentName
        // )
        //   .then((data: Entry) => {
        //     this.imageUrl = data.nativeURL;
        //     Camera.cleanup();
        //   })
        //   .catch(error => {
        //     this.imageUrl = "";
        //     console.log('toto error : : ' + error.message);
        //     const toast = this.toastCtrl.create({
        //       message: "Could not save the image, please try again !",
        //       duration: 2500
        //     });
        //     toast.present();
        //     Camera.cleanup();
        //   });
      })
      .catch(error => {
        console.log("error onTakePhoto : " + error);
        const toast = this.toastCtrl.create({
          message: "L'image n'a pas pu être enregistrée, veuillez réessayer !",
          duration: 2500
        });
        toast.present();
      });
  }
}
