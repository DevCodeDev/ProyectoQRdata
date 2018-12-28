import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LugarPage } from '../pages/lugar/lugar';

// conexion bd
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//QR code
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { LugaresService } from '../services/lugares.service';



export const firebaseConfig = {
  apiKey: "AIzaSyDI36t4zaHizW_6ebh6vHsU3GbhoXry2W8",
    authDomain: "ionicreadqr.firebaseapp.com",
    databaseURL: "https://ionicreadqr.firebaseio.com",
    projectId: "ionicreadqr",
    storageBucket: "ionicreadqr.appspot.com",
    messagingSenderId: "994188450047"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LugarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LugarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    LugaresService
  ]
})
export class AppModule {}
