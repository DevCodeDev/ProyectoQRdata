import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LugarPage } from '../lugar/lugar';
import { LugaresService } from '../../services/lugares.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // conexion a bd
  itemsRef: AngularFireList<any>;
  lugares: Observable<any>;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public lugaresService: LugaresService,
    ) { 
      this.itemsRef = afDB.list('/lugares');
      this.lugares = this.itemsRef.valueChanges();
      console.log(this.lugares);
      
    }

    IrVistaDetalle(){
      this.navCtrl.push(LugarPage, {lugar:{}});
    }

    delete(key: string){
      // this.itemsRef.remove(id);
      if(confirm('Seguro que desea borrar este elemento?')){
        return this.itemsRef.remove(key).then(()=>{
          alert('Elemento eliminado correctamente');
        });
        
       }
      
    }
}