import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LugaresService } from '../../services/lugares.service';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';

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

  lugar : any = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public lugaresService: LugaresService,
    private barcodeScanner: BarcodeScanner, 
    private cameraPlugin: Camera,
    private camera: Camera) {
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


}
