import { MyFirebaseService } from './../../services/myfirebase.service';
import { PlacePage } from "./../place/place";
import { Place } from "./../../models/place.model";
import { AddPlacePage } from "./../add-place/add-place";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, AlertController } from "ionic-angular";
import { LogInPage } from "../log-in/log-in";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private myFirebaseService: MyFirebaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log("ngOnInit HOME");
    this.updateUserData();
  }

  ionViewWillEnter() {
    console.log("WillEnter HOME");
    this.updateUserData();
  }

 async  onLogOut() {
    const alert = this.alertController.create({
      title: "Vous allez vous déconnecter",
      subTitle: "<strong>Êtes-vous sûr(e) ?</strong>",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            //alert.dismiss();
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.myFirebaseService.signOut().then(result => {
              this.navCtrl.push(LogInPage);

            }, error => {
              console.log('error while signing out user');
              console.log(error);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  updateUserData(){
    this.myFirebaseService.getFirebaseUserData().then(snapshot =>{
      this.places = [];
      snapshot.forEach(doc =>{
        var title = doc.data().title;
        var description = doc.data().description;
        var imagePath = doc.data().imagePath;
        var location = doc.data().location;
        var id = doc.data().id;
        var storeID = doc.data().storeID;
        this.places.push(new Place(title, description, location, imagePath, id, storeID));
      });
    });
  }

  onOpenPlaces(thePlace: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {
      place: thePlace,
      index: index
    });
    modal.onDidDismiss(data => {
      this.updateUserData();
    });
    modal.present();
  }
}
