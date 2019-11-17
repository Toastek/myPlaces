import { MyFirebaseService } from './../../services/myfirebase.service';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavParams,
  ViewController,
  AlertController
} from "ionic-angular";
import { Place } from "../../models/place.model";

@IonicPage()
@Component({
  selector: "page-place",
  templateUrl: "place.html"
})
export class PlacePage {
  place: Place;
  index: number;

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private myFirebaseService : MyFirebaseService
  ) {
    this.place = this.navParams.get("place");
    console.log("PlacePage");
    console.log(this.place);
    this.index = this.navParams.get("index");
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  async onDelete() {
    const alert = await this.alertCtrl.create({
      title: "Supprimer cet endroit",
      subTitle: "<strong>Êtes-vous sûr(e) ?</strong>",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
            //alert.dismiss();
            this.onLeave();
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Okay");
            this.myFirebaseService.deletePlaceFromFirebase(this.place)
            this.onLeave();
          }
        }
      ]
    });

    await alert.present();
    // this.placesService.deletePlace(this.index);
    // this.onLeave();
  }
}
