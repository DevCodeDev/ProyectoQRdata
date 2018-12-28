import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LugarPage } from '../lugar/lugar';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import {AddemployeePage} from '../addemployee/addemployee';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  employees: Observable<any>;


  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB : AngularFireDatabase
  
    ) {
      this.employees = afDB.list('employees').valueChanges();

      console.log(this.employees);
     }

    navegarALugar(){
      this.navCtrl.push(AddemployeePage);
    }
  
 
}