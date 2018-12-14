import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { UsuariosService } from '../../services/usuarios.service';
 
// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:any = {};
  qrData = null;
  createdCode = null;
  scannedCode = null;

  image: string = null;

  //fecha
  currentDate;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner, 
    private cameraPlugin: Camera,
    private camera: Camera,
    public afDB: AngularFireDatabase
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
    takeSelfie(){
      this.cameraPlugin.getPicture({
        quality : 90,
        destinationType : this.cameraPlugin.DestinationType.DATA_URL,
        sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      }).then(profilePicture => {
        // Send the picture to Firebase Storage
        const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
        selfieRef
        .putString(profilePicture, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`users/user1/profilePicture`)
            .set(savedProfilePicture.downloadURL);
        }).then(imageData => {
          this.image = `data:image/jpeg;base64,${imageData}`;
        }).catch(error =>{
               console.error( error );
           });
      }, error => {
        // Log an error to the console if something goes wrong.
        console.log("ERROR -> " + JSON.stringify(error));
      });
   }

  //  guardar toda la data
   GuardarDocument(){
     console.log(this.usuario);
    // this.usuario.id = Date.now();
    this.afDB.database.ref('usuarios/descripcion/').set(this.usuario);
   }

  //  nuevo documento
  NuevoDocument(){
    alert("creaste nuevo documento");
  }



 
}