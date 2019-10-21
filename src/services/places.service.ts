import { File } from "ionic-native";
import { Place } from "./../models/place.model";
import { Location } from "./../models/location.model";

import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage) {}

  addPlace(
    title: string,
    description: string,
    location: Location,
    imageUrl: string
  ) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage
      .set("places", this.places)
      .then(data => {
        console.log("place stored successfully !");
      })
      .catch(error => {
        this.places.splice(this.places.indexOf(place));
        console.log("error while storing place !");
        console.log(error.message);
      });
  }

  loadPlaces() {
    console.log('loadPlaces from service executed normally !');
    return this.places.slice();
  }

  async fetchPlaces() {
    return this.storage
      .get("places")
      .then((places: Place[]) => {
        this.places = places != null ? places : [];
        console.log('fetchedPlace from service executed normally !');
        return (this.places);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage
      .set("places", this.places)
      .then(() => {
        //this.removeFile(place);
        console.log("deletePlace from service executed normaly !");
      })
      .catch(error => {
        console.log("error while deleting place : " + error);
      });
    // this.storage
    //   .get("places")
    //   .then(result => {
    //     console.log("places = ");
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
  }

  // private removeFile(place: Place) {
  //   const currentName = place.imagePath.replace(/^.*[\\\/]/, "");
  //   File.removeFile(cordova.file.dataDirectory, currentName)
  //     .then()
  //     .catch(error => {
  //       console.log("removeFileError : " + error.message);
  //       this.addPlace(
  //         place.title,
  //         place.description,
  //         place.location,
  //         place.imagePath
  //       );
  //     });
  // }
}
