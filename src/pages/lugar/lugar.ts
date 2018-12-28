import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LugaresService } from '../../services/lugares.services';

import { storage } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the LugarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {

  lugar: any = {};
  scannedCode: {};
  options :BarcodeScannerOptions;
  image: string = null;

  // muestra fecha y hora
  myDate: String = new Date().toISOString();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private camera:Camera,
    public LugaresService:LugaresService,
    public afDB: AngularFireDatabase
    ) {
      this.lugar = navParams.get('lugar');
  }

  // funcion de scaneado
  scanCode(){
    this.options = {
      prompt : "Scanear tu codigo"
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      console.log(barcodeData);
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log("Error ocurrio: " + err);
    })
 
  }

  async getPicture(){
    try {
      //Definimos opciones de camara
      const options: CameraOptions = {
        quality: 100,
        targetHeight:1000,
        targetWidth: 1000,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result = await this.camera.getPicture(options).then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      });
      const image = `data:image/jpeg;base64,${result}`;
      const pictures = storage().ref('pictures/sugerencias');
      pictures.putString(image, 'data_url');
    }
  catch (e){
    console.log(e);
  }
  }

  guardarLugar(){
    console.log(this.lugar);
    // console.log(this.myDate);
  }


}
