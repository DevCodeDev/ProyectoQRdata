import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LugarPage } from '../lugar/lugar';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // muestra fecha y hora
  myDate: String = new Date().toISOString();

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams
  
    ) { }

    navegarALugar(){
      this.navCtrl.push(LugarPage);
    }
  
 
}