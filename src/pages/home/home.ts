import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LugarPage } from '../lugar/lugar';
import { LugaresService } from '../../services/lugares.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // lugares : any = [];
  lugares: Observable<any[]>

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,

    public afDB: AngularFireDatabase,
    public lugaresService: LugaresService
    ) { 
      this.lugares = afDB.list('/lugares').valueChanges();
      console.log(this.lugares);
      // this.lugaresService.getLugares().valueChanges()
      //  .subscribe((lugaresFB) =>{
      //    this.lugares = lugaresFB;
      //  })
    }

    IrVistaDetalle(){
      this.navCtrl.push(LugarPage, {lugar:{}});
    }

    deleteLugar(lugar){
      if(confirm('Seguro que desea borrar este elemento?')){
        return this.lugaresService.deleteLugar(lugar).then(()=>{
          alert('Elemento eliminado correctamente');
        });
      }
      
    }
}