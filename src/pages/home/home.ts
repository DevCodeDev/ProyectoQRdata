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

  lugares: any = [
    {codeQR: 'lugar 1', descripcion: 'Descripcion 1', fechaActual: '5/12/2005 09:25:02 AM'},
    {codeQR: 'lugar 2', descripcion: 'Descripcion 2', fechaActual: '10/05/2005 07:40:09 AM'},
    {codeQR: 'lugar 3', descripcion: 'Descripcion 3', fechaActual: '20/01/2005 08:45:05 AM'}
  ];

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams
  
    ) { }

    navegarALugar(){
      this.navCtrl.push(LugarPage, {lugar: {}});
    }
  
 
}