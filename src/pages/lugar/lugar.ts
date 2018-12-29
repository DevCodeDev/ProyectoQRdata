import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LugaresService } from '../../services/lugares.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environments';
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

  image: any = {};
  profilePicture: any = {};
  pictureId: any;

  // lugar : any = {};
  nombre = '';
  direccion = '';
  categoria = '';

  lugaress : AngularFireList<any>;

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
    // public firebase: FirebaseApp
    ) {
      // this.lugar = navParams.get('lugar');
      this.lugaress = afDB.list('/lugares');
      //firebase.initializeApp(environment.firebase);
  }

  guardarLugar(nombre,direccion,categoria){
    this.imageName = nombre;

    this.lugaress.push({

      nombre: nombre,
      direccion: direccion,
      categoria:categoria,
      image:this.imageName
      
    }).then(newLugaar => {
      this.navCtrl.pop();
    })
    this.upload();
  }

  // guardarLugar(){
  //   if(!this.lugar.id){
  //     this.lugar.id = Date.now();
  //   }
  //   this.lugaresService.createLugar(this.lugar);
  //   alert("Guardado con exitoso");
  //   this.navCtrl.pop();
  //   console.log(this.lugar);
  // }

    
   /************ */
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
      this.currentImage = 'data:image/jpeg;base64,'+ImageData;
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


}
