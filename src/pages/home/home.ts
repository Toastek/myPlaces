import { PlacePage } from "./../place/place";
import { PlacesService } from "./../../services/places.service";
import { Place } from "./../../models/place.model";
import { AddPlacePage } from "./../add-place/add-place";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
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
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.placesService.fetchPlaces().then(
      (places: Place[]) => this.places = places
    );
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlaces(thePlace: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {
      place: thePlace,
      index: index
    });
    modal.present();
  }

  onToto() {
    this.navCtrl.push(LogInPage);
  }
}
