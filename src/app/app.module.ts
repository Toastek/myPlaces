import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule } from "@ionic/storage";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { PlacePage } from "./../pages/place/place";
import { SetLocationPage } from "./../pages/set-location/set-location";
import { AddPlacePage } from "./../pages/add-place/add-place";
import { SignInPage } from "./../pages/sign-in/sign-in";
import { LogInPage } from "./../pages/log-in/log-in";

import { PlacesService } from "./../services/places.service";
import { MyFirebaseService } from './../services/myfirebase.service';

import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage,
    SignInPage,
    LogInPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDcCD_pPnltidQL1MwO78tXY2iQ2b3LHqE"
    }),
    AngularFireModule.initializeApp(firebaseConfig.fire),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage,
    SignInPage,
    LogInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PlacesService,
    MyFirebaseService,
    AngularFireAuth,
  ]
})
export class AppModule {}
