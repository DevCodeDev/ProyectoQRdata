import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { LugaresService } from '../../services/lugares.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseApp } from 'angularfire2';


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

  usuario:any = {};
  qrData = null;
  createdCode = null;
  scannedCode = null;

  image: string = null;
  pictureId: any;
  avatar?:any;

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
    public firebase: FirebaseApp,
    private toastCtrl: ToastController) {
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

//tomar foto
  // async takePhoto(source){
  //   try{
  //     let cameraOptions:CameraOptions = {
  //       quality:100,
  //       targetHeight:200,
  //       targetWidth:200,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE
  //     };
  //     cameraOptions.sourceType = (source === 'camera') ? this.camera.PictureSourceType
  //       .CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
  //       const result = await this.camera.getPicture(cameraOptions);
  //       const image = 'data:image/jpeg;base64,' + result;
  //       this.pictureId = Date.now();
  //       this.lugaresService.uploadPicture(this.pictureId + '.jpg', image)
  //        .then((data)=>{
  //           this.lugaresService.getDownloadURL(this.pictureId + '.jpg')
  //             .subscribe((url)=>{
  //                 this.avatar = url;
  //                 let toast = this.toastCtrl.create({
  //                   message: 'Foto Subida',
  //                   duration: 3000,
  //                   position: 'bottom'
  //                 });
  //                 toast.present();
  //             }, (error)=>{
  //               console.log(error);
  //             })
  //        }).catch((error)=>{
  //          console.log(error);
  //        });

  //   } catch (e){
  //     console.error(e);
  //   }
  // }


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

}
