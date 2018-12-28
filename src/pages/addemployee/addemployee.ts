import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';


/**
 * Generated class for the AddemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addemployee',
  templateUrl: 'addemployee.html',
})
export class AddemployeePage {
  employess: AngularFireList<any>;
  name='';
  lname='';
  age='';
  dept='';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB : AngularFireDatabase) {
    this.employess = afDB.list('/employees');
  }
  createEmployee(name,lname,age,dept){
    this.employess.push({
      name : name,
      lname : lname,
      age : age,
      dept: dept
    }).then(newEmployee => {
      this.navCtrl.setRoot(HomePage);
    })
  }
}
