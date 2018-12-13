import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
 
// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  createdCode = null;
  scannedCode = null;

  image: any;

  //fecha
  currentDate;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner, 
    private camera: Camera
    ) { 
      this.currentDate = new Date().toString();
      
    }

    // scanear
    scanCode() {
     this.barcodeScanner.scan().then(barcodeData => {
       this.scannedCode = barcodeData.text;
     }, (err) => {
         console.log('Error: ', err);
     });
   }

  //  tomar foto
     getPicture(){
      let options: CameraOptions = {
      //  quality: 70,
      //  destinationType: this.camera.DestinationType.FILE_URI,
      //  encodingType: this.camera.EncodingType.JPEG,
      //  mediaType: this.camera.MediaType.PICTURE
         destinationType: this.camera.DestinationType.DATA_URL,
         targetWidth: 1000,
         targetHeight: 1000,
         quality: 100
     }
     this.camera.getPicture( options )
     .then(imageData => {
       this.image = `data:image/jpeg;base64,${imageData}`;
     })
     .catch(error =>{
       console.error( error );
     });
   }

  //  nuevo documento
   NuevoDocument(){
     alert("creaste nuevo documento");
   }

  //  guardar toda la data
   GuardarDocument(){
    alert("Guardar Document nuevo documento");
   }


 
}