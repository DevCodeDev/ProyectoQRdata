import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { LugarPage } from '../lugar/lugar';
import { LugaresService } from '../../services/lugares.service';
 
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

  lugares : any = [];

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public lugaresService: LugaresService
    ) { 
      this.lugaresService.getLugares().valueChanges()
       .subscribe((lugaresFB) =>{
         this.lugares = lugaresFB;
       })
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