import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LugaresService } from '../../services/lugares.services';

import { storage } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
=======
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LugaresService } from '../../services/lugares.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseApp } from 'angularfire2';

>>>>>>> prueba1

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

<<<<<<< HEAD
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
=======
  usuario:any = {};
  qrData = null;
  createdCode = null;
  scannedCode = null;

  image: string = null;

  lugar : any = {};

  selectedPhoto;
  loading;
  currentImage;
  imageName;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public lugaresService: LugaresService,
    public afDB: AngularFireDatabase,
    private barcodeScanner: BarcodeScanner, 
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public firebase: FirebaseApp) {
      this.lugar = navParams.get('lugar');
  }

  

  guardarLugar(){
    if(!this.lugar.id){
      this.lugar.id = Date.now();
    }
    this.lugaresService.createLugar(this.lugar);
    alert("Guardado con exitoso");
    this.navCtrl.pop();
    console.log(this.lugar);
  }

  takePhoto(){
    const options : CameraOptions = {
      quality:100,
      targetHeight:200,
      targetWidth:200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then( ImageData => {
      this.loading = this.loadingCtrl.create({
        content: 'Tomado foto'
      });
      this.image = `data:image/jpeg;base64,${ImageData}`;

      this.loading.present();
      this.selectedPhoto = this.dataURLBlob('data:image/jpeg;base64,'+ImageData);
      this.loading.dismiss();
      this.currentImage = 'data:image/jpeg;base64,'+ImageData;
    },(err)=>{
      console.log(err);
    });
  }

  dataURLBlob(dataURL){
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (let index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
      
    }
    return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
  }

  /************ */
  upload(){
    if(this.selectedPhoto){
      var uploadTask = this.firebase.storage().ref().child('images/' + this.imageName + '.jpeg').put(this.selectedPhoto);
      uploadTask.then(this.onError);
    }
  }

  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }
  /************* */

>>>>>>> prueba1


}
