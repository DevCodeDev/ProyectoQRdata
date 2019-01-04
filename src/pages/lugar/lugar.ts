import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LugaresService } from '../../services/lugares.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {

  image: any = {};
  profilePicture: any = {};
  pictureId: any;

  nombre = '';
  categoria = '';
  
  
  // listado de conexion a bd
  lugaress : AngularFireList<any>;
  date:any; //dia

  selectedPhoto;
  loading;
  currentImage;
  imageName;

  // sncaneado
  data={};
  option: BarcodeScannerOptions;
  barcodeData:any;//cualquier tipo

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public lugaresService: LugaresService,
    public afDB: AngularFireDatabase,
    private barcodeScanner: BarcodeScanner, 
    private camera: Camera,
    public loadingCtrl: LoadingController
    ) {
      this.lugaress = afDB.list('/lugares');
  }

  // guardado de datos
  guardarLugar(nombre,direccion,categoria){//Entre categoria y nombre estuvo direccion
    this.imageName = nombre;
    this.barcodeData = this.data;//asignamos que enviar a bd

    //dia
    this.date = Date.now();

    this.lugaress.push({

      date: this.date,//envio de dia
      nombre: nombre,
      categoria:categoria,
      barcodeData:this.barcodeData,//envio a bd
      image:this.imageName
      
    }).then(newLugaar => {
      this.navCtrl.setRoot(HomePage);
    })
    this.upload();
  }
    
   /******* carga de foto a bd ***** */
   upload(){
    if(this.selectedPhoto){
      var uploadTask = firebase.storage()
       .ref()
        .child('images/' + this.imageName + '.jpeg')
         .put(this.selectedPhoto);
      uploadTask.then(this.onError);
    }
  }

  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }
  /************* */

// toma de foto

  takePhoto(){
    const options : CameraOptions = {
      quality:100,
      targetHeight:200,
      targetWidth:200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then( ImageData => {
      this.loading = this.loadingCtrl.create({
        content: 'Tomado foto'
      });
      this.image = `data:image/jpeg;base64,${ImageData}`;
      this.loading.present();
      this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);
      this.loading.dismiss();
      this.currentImage = 'data:image/jpeg;base64,'+ ImageData;
    },(err)=>{
      console.log(err);
    });
  }

  dataURLtoBlob(dataURL){
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (let index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
      
    }
    return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
  }

  // scaneado
  scan(){
    this.option = {
      prompt: "por favor scanee su codiogo"
    }
    this.barcodeScanner.scan(this.option).then((barcodeData) =>{
      console.log(barcodeData);
      this.data = barcodeData;
    }, (err) => {
        console.log(err);
    });
    this.upload();
  }


}
